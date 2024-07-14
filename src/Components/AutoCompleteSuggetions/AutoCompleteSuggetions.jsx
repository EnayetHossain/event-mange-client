const AutoCompleteSuggetions = ({
  suggetions = [],
  highlight,
  dataKey,
  onSuggetionClick,
  activeIndex
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {
          parts.map((part, idx) => {
            return part.toLowerCase() === highlight.toLowerCase() ? <b className="text-accent-color" key={idx}>{part}</b> : part
          })
        }
      </span>
    );
  }

  return (
    <>
      {
        suggetions.map((suggetion, idx) => {
          const correctSuggetion = dataKey ? suggetion[dataKey] : suggetions;

          return (
            <li
              key={idx}
              onClick={() => onSuggetionClick(suggetion)}
              className={`p-2 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 ${activeIndex === idx ? "bg-gray-200" : ""}`}>
              {
                getHighlightedText(correctSuggetion, highlight)
              }
            </li>
          )
        })
      }
    </>
  )
}

export default AutoCompleteSuggetions;
