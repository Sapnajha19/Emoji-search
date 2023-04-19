import React, { useState, useEffect } from 'react'
import "./SearchBar.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchBar() {
  const [search, setSearch] = useState([])
  const [data, setData] = useState([])
  const handleChange = (e) => {
    setSearch(e.target.value);
  }



  const emojis = document.querySelectorAll('.emoji');

emojis.forEach((emoji) => {
  emoji.addEventListener('mouseenter', (event) => {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = 'Click to copy';
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${event.target.offsetTop - 30}px`;
    tooltip.style.left = `${event.target.offsetLeft}px`;
    emoji.parentElement.appendChild(tooltip);
  });

  emoji.addEventListener('mouseleave', () => {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});

  const handleInput = () => {
    if (search !== '') {
      const API_KEY = 'f636eea0c4805503674c6268a69f45dd3ef130cd';
      fetch(`https://emoji-api.com/emojis?search=${search}&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(res => {
          if (res) {
            setData(res)
          } else {
            setData([])
          }
        })
      console.log(data);
    }
  }
  useEffect(() => {
    async function fetchData() {
      const API_KEY = 'f636eea0c4805503674c6268a69f45dd3ef130cd';
      const response = await fetch(`https://emoji-api.com/emojis?access_key=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      setData(data);
    }
    fetchData();
  }, []);

  const handleShow = () => {

  }
  const handleCopy = (emoji) => {
    navigator.clipboard.writeText(emoji);
    handleShow()
    toast.success(`${emoji} copied to clipboard!`);
  }

  return (
    <div>
      <ToastContainer position="top-center"/>
      <input type="text" placeholder="Search emoji" value={search} onChange={(e) => handleChange(e)} onInput={handleInput} style={{ width: "1050px", height: "70px", background: "#302C66", color: "#ffffff", border: "none", borderRadius: "15px", outline: "none", fontSize: "24px", fontWeight: "400", fontStyle: "normal", fontFamily: "Basis Grotesque Pro", textIndent: "25px" }} />
      <div className='container' style={{ width: "1050px", height: "297px", background: "#302C66", borderRadius: "15px", marginTop: "20px"}}>
        <div className='emoji' style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', gridGap: '10px', alignItems: "center", justifyContent: "center" }}>
          {data.map((emoji) => (
            <div key={emoji.slug} style={{ fontSize: '3em', cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => handleCopy(emoji.character)}>
              {emoji.character}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

