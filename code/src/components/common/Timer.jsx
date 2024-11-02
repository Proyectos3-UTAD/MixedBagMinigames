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