const useCountDown = (date)=>{
    const countDownDate = new Date(date).getTime();
    const now = new Date().getTime();
    const gap = countDownDate - now;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    const textDays = Math.floor(gap / days);
    const textHours = Math.floor((gap % days) / hours);
    const textMinutes = Math.floor((gap % hours) / minutes);
    const textSeconds = Math.floor((gap % minutes) / seconds)

    return {textDays, textHours, textMinutes, textSeconds, gap}
}

export default useCountDown;