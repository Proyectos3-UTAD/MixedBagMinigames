// src/components/spaceInvaders/enemy.jsx
import React from 'react';
import PropTypes from 'prop-types'; // Importación correcta de PropTypes
import classNames from 'classnames'; // Asegúrate de que 'classnames' esté instalado

const Enemy = ({ isEnemy }) => {
    return (
        <div className={classNames('enemy', { 'enemy--active': isEnemy })}>
            {/* Contenido del enemigo */}
            Enemy
        </div>
    );
};

// Definición de PropTypes para el componente Enemy
Enemy.propTypes = {
    isEnemy: PropTypes.bool.isRequired, // Define que isEnemy es de tipo booleano y es requerido
};

export default Enemy;
