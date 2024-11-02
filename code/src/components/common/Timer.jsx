/**
 * Simple component that displays the tine passed since an starting date.
 * @param {*} className The class or classes to be assigned to the component. 
 * @param {*} startDate A Date().getTime() with the initial time.
 * @returns 
 */
function Timer({className, startDate}) {

    const currentDate = new Date().getTime();

    const diff = currentDate - startDate;

    const minutes = Math.floor((diff / 1000) / 60);

    const seconds = Math.floor((diff / 1000) % 60);

    return (
        <div className={className}>
            {minutes}:{seconds}
        </div>
    );
}

export default Timer;