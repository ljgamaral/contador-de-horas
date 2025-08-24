import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TimeSelector.css';

const TimeSelector = () => {
  const [selectedHour, setSelectedHour] = useState(22);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSave = () => {
    const targetTime = new Date();
    targetTime.setHours(selectedHour, selectedMinute, 0, 0);
    
    // Se o horário já passou hoje, definir para amanhã
    if (targetTime <= new Date()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    localStorage.setItem('targetTime', targetTime.toISOString());
    navigate('/timer');
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const formatBrasiliaTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false
    });
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
    scrollToPosition(hourRef.current, hour, 60);
  };

  const handleMinuteClick = (minute) => {
    setSelectedMinute(minute);
    scrollToPosition(minuteRef.current, minute, 60);
  };

  const scrollToPosition = (containerRef, value, itemHeight) => {
    if (containerRef) {
      const container = containerRef.querySelector('.time-scroll-container');
      const targetScrollTop = value * itemHeight;
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  const handleHourScroll = (e) => {
    const container = e.target;
    const itemHeight = 60;
    const scrollTop = container.scrollTop;
    const selectedIndex = Math.round(scrollTop / itemHeight);
    
    if (selectedIndex >= 0 && selectedIndex <= 23 && selectedIndex !== selectedHour) {
      setSelectedHour(selectedIndex);
      // Snap para a posição exata
      setTimeout(() => {
        container.scrollTo({
          top: selectedIndex * itemHeight,
          behavior: 'smooth'
        });
      }, 150);
    }
  };

  const handleMinuteScroll = (e) => {
    const container = e.target;
    const itemHeight = 60;
    const scrollTop = container.scrollTop;
    const selectedIndex = Math.round(scrollTop / itemHeight);
    
    if (selectedIndex >= 0 && selectedIndex <= 59 && selectedIndex !== selectedMinute) {
      setSelectedMinute(selectedIndex);
      // Snap para a posição exata
      setTimeout(() => {
        container.scrollTo({
          top: selectedIndex * itemHeight,
          behavior: 'smooth'
        });
      }, 150);
    }
  };

  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    return minutes;
  };

  return (
    <div className="time-selector">
      <div className="header">
        <h1>Contador de horas</h1>
        <p>Selecione a hora de término do cronômetro</p>
      </div>

      <div className="time-picker">
        <div className="time-column" ref={hourRef}>
          <div className="selection-line"></div>
          <div className="time-scroll-container" onScroll={handleHourScroll}>
            {generateHours().map((hour) => (
              <div
                key={hour}
                className={`time-option ${hour === selectedHour ? 'selected' : ''}`}
                onClick={() => handleHourClick(hour)}
              >
                {formatTime(hour)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="time-separator">:</div>
        
        <div className="time-column" ref={minuteRef}>
          <div className="selection-line"></div>
          <div className="time-scroll-container" onScroll={handleMinuteScroll}>
            {generateMinutes().map((minute) => (
              <div
                key={minute}
                className={`time-option ${minute === selectedMinute ? 'selected' : ''}`}
                onClick={() => handleMinuteClick(minute)}
              >
                {formatTime(minute)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        Salvar
      </button>

      <div className="footer">
        <div className="footer-left">
          <span>Horário de Brasília:</span>
          <span className="current-time">{formatBrasiliaTime(currentTime)}</span>
        </div>
        <div className="footer-right">
          <span>Desenvolvido por:</span>
          <a href="https://github.com/ljgamaral" target="_blank" className="developer">ljgamaral</a>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
