import './App.css';
import { useEffect, useState, useRef, } from 'react';
import { NavLink, useLocation } from 'react-router-dom'

function App() {
  const [theme, setTheme] = useState('light')
  const [tog, setTog] = useState(false)
  const themes = [
    {
      text: 'text-indigo-500',
      bg: 'bg-indigo-500',
      light: 'bg-indigo-50',
    },
    {
      text: 'text-red-500',
      bg: 'bg-red-500',
      light: 'bg-red-50',
    },
    {
      text: 'text-green-500',
      bg: 'bg-green-500',
      light: 'bg-green-50',
    },
    {
      text: 'text-yellow-500',
      bg: 'bg-yellow-500',
      light: 'bg-yellow-50',
    },
    {
      text: 'text-purple-500',
      bg: 'bg-purple-500',
      light: 'bg-purple-50',
    }
    ,
    {
      text: 'text-blue-500',
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
    }
  ]
  const [themeColor, setThemeColor] = useState(themes[0])
  const location = useLocation();
  const TabRef = useRef();
  const li = ['Home', 'About', 'Services', 'Blog', 'Goals']
  useEffect(() => {
    console.log(location.pathname);
    if (li.indexOf(location.pathname.slice(1)) >= 0) {
      TabRef.current.children[li.indexOf(location.pathname.slice(1))].click();
    }
    let indecator = TabRef.current.nextSibling;
    // TabRef.current.querySelector('.indecator');
    let lists = TabRef.current.children;
    //array of ListItems
    // remove active tab from all tabs and add it on Click
    const moveIndecator = (e, listItem) => {
      TabRef.current.querySelectorAll('.active-tab').forEach(li => {
        li.classList.remove('active-tab')
      });
      //  all classed removed now 
      listItem.classList.add('active-tab');
      indecator.style.height = listItem.offsetHeight + "px";
      indecator.style.top = listItem.offsetTop + "px";
      indecator.style.opacity = 1;
      indecator.style.transform = 'translate(0px)';
      //  active ones added 
    }
    const activetor = (listItem) => {
      listItem.addEventListener('click', (e) => {
        //make the code work on Click 
        moveIndecator(e, listItem.children[0])
      }
      )
    }

    for (const listItem of lists) {
      activetor(listItem);
    }
  }, [location.pathname])
  return <div className={theme}>

    <div className={`m-auto App dark:bg-gray-900`}>
      <div className={`flex justify-around items-center  py-12 w-full dark:bg-gray-800 ${themeColor.light}`}>

        <div className="flex relative flex-wrap themeCustomeizer">
          <div className='relative'>
            <div onClick={() => setTog(!tog)} className={`p-3  cursor-pointer  ${themeColor.bg} rounded-full`}></div>
            {/* <input type="checkbox"  className="absolute w-[100%] h-[100%] opacity-0 cursor-pointer"/> */}
          </div>

          <div className={`${tog ? "show" : 'hide'}   absolute  top-10 left-[-100%]  w-[100px] flex flex-wrap bg-white justify-center  py-2 rounded-md border-2 border-gray-50 dark:border-none dark:bg-gray-800`}>

            {themes.map((i) => {
              return <div className={`p-3 cursor-pointer  m-2 ${i.bg} rounded-2xl`} onClick={() => {
                setThemeColor(i);
              }}></div>
            })
            }
          </div>

        </div>
        <label for="toggle" class={`flex items-center cursor-pointer`}>
          <div class={`mr-3 font-medium text-gray-600 ${theme == 'light' ? themeColor.text : ''}`}>
            OFF
          </div>
          <div class="relative">
            <input type="checkbox" onChange={() => {
              theme == 'light' ? setTheme('dark') : setTheme('light')
            }} id="toggle" class="sr-only" />
            <div class={`block w-14 h-8 rounded-full ${themeColor.bg}`}></div>
            <div class={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition dot    ${theme == 'dark' ? `bg-{themeColor}-600` : null}`}></div>
          </div>
          <div class={`ml-3 font-medium text-gray-600  ${theme == 'dark' ? themeColor.text : ''}`}>
            ON
          </div>
        </label>

      </div>

      <header className="flex justify-center items-center h-screen flex-grow-1">
        <div className='relative shadowme dark:shadow-none  dark:border-none min-w-[350px] m-auto rounded-md '>
          <ul ref={TabRef} className="flex overflow-hidden relative flex-col justify-start justify-items-start items-start p-5 w-[100%] list-none dark:bg-gray-800 bg-light-100">
            {li.map((e, i) => {
              return <li key={i} >

                <NavLink

                  to={`/${e}`}
                  // 

                  className={({ isActive }) =>
                    `${isActive ? themeColor.text : null}
      py-4 w-[100%]  block text-gray-500 text-left hover:${themeColor.text} transition-all duration-500  cursor-pointer
      `}
                >
                  {e}
                </NavLink>
              </li>
            })}
          </ul>
          <div className={`rounded-md  transition-all duration-150 	ease-linear opacity-0 translate-x-2 indecator h-[40px] w-[5px] absolute right-0 top-[30px] transition-tab ${themeColor.bg}`}></div>

        </div>
      </header>

      <div class={`py-5 text-sm text-center text-gray-600  dark:bg-gray-800 ${themeColor.light} rounded x-4`}>
        Created with nights of Crying And coffee ☕
        <br />
        <a href="https://twitter.com/Khaled70834970" class={`block ${themeColor.text} pt-3`}>Wanna More ?🔥🚀🇪🇬</a>
      </div>

    </div>
  </div>

}

export default App;
