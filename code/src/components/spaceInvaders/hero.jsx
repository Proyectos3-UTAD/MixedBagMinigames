import React from 'react';
import PropTypes from 'prop-types'; // Asegúrate de que está importado aquí
import classNames from 'classnames';

const Hero = ({ x, y }) => {
    return (
        <div
            className={classNames('hero')}
            style={{
                left: `${x}px`,
                top: `${y}px`
            }}
        />
    );
};

Hero.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

export default Hero;
