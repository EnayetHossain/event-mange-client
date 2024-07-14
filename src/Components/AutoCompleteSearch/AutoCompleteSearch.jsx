import "./AutoCompleteSearch.css";
import { IoSearch } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import AutoCompleteSuggetions from "../AutoCompleteSuggetions/AutoCompleteSuggetions";

const AutoCompleteSearch = ({
  placeholder = "",
  staticData,
  fetchSuggetions,
  dataKey = "",
  customLoading = "Loading..",
  onSelect = () => { },
  onChange = () => { },
  onBlur = () => { },
  onFocus = () => { },
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggetions, setSuggetions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value)

    if (event.target.value.length <= 0) {
      setIsFocused(false);
    } else if (event.target.value.length >= 1) {
      setIsFocused(true);
    }
  }

  // get suggetions from database
  const getSuggetions = useCallback(async () => {
    if (inputValue.length > 1) {
      setError(null);
      setLoading(true);

      try {
        let result;
        if (staticData) {
          result = staticData.filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
          );
        } else if (fetchSuggetions) {
          // get only title field from API and exclude all other field with the _id field
          result = await fetchSuggetions(inputValue, "title,-_id");
        }

        setSuggetions(result);
      } catch (error) {
        setError("Failed to fetch suggetions");
        setSuggetions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggetions([]);
    }
  }, [staticData, fetchSuggetions, inputValue])


  // debouce implementation
  useEffect(() => {
    const getData = setTimeout(getSuggetions, 300);

    return () => clearTimeout(getData)
  }, [getSuggetions])


  // get events data based on searched query
  const handleSuggetionClick = (suggetion) => {
    setInputValue(dataKey ? suggetion[dataKey] : dataKey);
    onSelect(suggetion);
    setSuggetions([]);
    setIsFocused(false);
  }

  const handleFocus = (event) => {
    setIsFocused(true);
    onFocus(event);
  }

  // close suggetions list if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleKeyDown = (event) => {
    if (!suggetions.length) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prevIndex) => prevIndex === suggetions.length - 1 ? 0 : prevIndex + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prevIndex) => prevIndex === 0 ? suggetions.length - 1 : prevIndex - 1);
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < suggetions.length) {
          handleSuggetionClick(suggetions[activeIndex]);
        }
        break;
      case "Escape":
        setIsFocused(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (containerRef.current && activeIndex >= 0 && activeIndex < suggetions.length) {
      const activeElement = containerRef.current.children[activeIndex];

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        })
      }
    }
  }, [activeIndex, suggetions])

  return (
    <div className="sign-form !m-0 !p-0 work-sans relative">
      <div className="search-input">
        <label className="mb-3" htmlFor="search">
          Search events
        </label>
        <div className="flex items-center justify-between">
          <span className="mr-3 form-icon">
            <IoSearch />
          </span>
          <input
            className="pl-1 w-full"
            type="search"
            onBlur={onBlur}
            onFocus={handleFocus}
            value={inputValue}
            placeholder={placeholder}
            name="search"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>
      </div>

      {
        (isFocused && (suggetions.length > 0 || loading || error)) && (
          <ul
            ref={containerRef}
            className="absolute top-full left-0 bg-white w-full rounded-[2rem] p-4 mt-4 autocomplete-shadow max-h-[24rem] overflow-y-auto">
            {error && <span className="error">{error}</span>}
            {loading && <span>{customLoading}</span>}
            <AutoCompleteSuggetions
              dataKey={dataKey}
              highlight={inputValue}
              suggetions={suggetions}
              onSuggetionClick={handleSuggetionClick}
              activeIndex={activeIndex}
            />
          </ul>
        )
      }
    </div>
  )
}

export default AutoCompleteSearch;
