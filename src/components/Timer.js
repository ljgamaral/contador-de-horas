import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timer.css';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [targetTime, setTargetTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTime = localStorage.getItem('targetTime');
    if (!savedTime) {
      navigate('/');
      return;
    }

    const target = new Date(savedTime);
    setTargetTime(target);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const handleReset = () => {
    localStorage.removeItem('targetTime');
    navigate('/');
  };

  const formatTargetTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('pt-BR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!targetTime) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="timer">
      <div className="timer-header">
        <h1>Contador Regressivo</h1>
        <p>Termina às: {formatTargetTime(targetTime)}</p>
      </div>

      <div className="timer-display">
        {isExpired ? (
          <div className="expired-message">
            <h2>Tempo Esgotado!</h2>
            <p>O cronômetro chegou ao fim.</p>
          </div>
        ) : (
          <>
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.hours)}</span>
              <span className="time-label">Horas</span>
            </div>
            
            <div className="time-separator">:</div>
            
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.minutes)}</span>
              <span className="time-label">Minutos</span>
            </div>
            
            <div className="time-separator">:</div>
            
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.seconds)}</span>
              <span className="time-label">Segundos</span>
            </div>
          </>
        )}
      </div>

      <div className="timer-controls">
        <button className="reset-button" onClick={handleReset}>
          Voltar
        </button>
      </div>

      <div className="timer-footer">
        <div className="footer-left">
          <span>Horário de Brasília:</span>
          <span className="current-time">{new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false })}</span>
        </div>
        <div className="footer-right">
          <span>Desenvolvido por:</span>
          <a href="https://github.com/ljgamaral" target="_blank" className="developer">ljgamaral</a>
        </div>
      </div>
    </div>
  );
};

export default Timer;
