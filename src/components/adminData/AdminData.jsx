import { useNavigate } from 'react-router-dom'
import './style.css'
import * as echarts from 'echarts';
import { useEffect } from 'react';
import * as React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector } from 'react-redux';


export const AdminData = () => {

  const data = useSelector(s => s.cards?.data);
  const navigate = useNavigate()

  // для даты
  const options = {
    day: 'numeric',
    month: '2-digit',
    year: "numeric",
  }

  //сортировка для диаграммы
  const cards = [...data];
  const sortLikes = cards.sort((a, b) => b.likes.length - a.likes.length).slice(0, 10);
  const titleItem = sortLikes.map((item) => (item?.title))
  const likesItem = sortLikes.map((item) => item?.likes?.length)

  useEffect(() => {
    const option = {
      title: {
        text: 'Самые популярные посты',
        textStyle: {
          fontSize: 25,
          color: "white",
        },
        left: "28%",
        padding: [1, 10, 10, 1],
      },
      tooltip: {},
      xAxis: {
        data: titleItem,
        name: 'ПОСТЫ',
        color: "white",
        nameTextStyle: {
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: 14,
          color: "rgba(15, 194, 243, 0.95)",
        },
        axisLabel: {
          fontSize: 16,
          fontWeight: "normal",
          color: "white",
          rotate: 30,
          margin: 10
        }
      },
      yAxis: [{
        name: 'ЛАЙКИ',
        type: "value",
        nameTextStyle: {
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: 14,
          color: "rgba(15, 194, 243, 0.95)",
        },
        axisLabel: {
          fontSize: 16,
          fontWeight: "normal",
          color: "white"
        }
      }],
      series: [
        {
          name: 'пост',
          type: 'bar',
          data: likesItem,
          color: "blue"
        }
      ]
    }

    const chartDom = document.getElementById('chartsId')
    const myChart = echarts.init(chartDom)

    option && myChart.setOption(option)
  }, [])

  // таблица
  const columns = [
    {
      name: 'Название поста',
      selector: item => item.title,
      sortable: true
    },
    {
      name: 'Лайки шт',
      selector: item => item.likes.length,
      sortable: true
    },
    {
      name: 'Дата создания',
      selector: item => new Date(item.created_at).toLocaleString('ru', options).slice(0, 10),
      sortable: true
    },
    {
      name: 'Дата редактирования',
      selector: item => new Date(item.updated_at).toLocaleString('ru', options).slice(0, 10),
      sortable: true
    },
    {
      name: 'Автор',
      selector: item => item.author.name,
      sortable: true
    },
  ]

  // стиль для таблицы
  createTheme('solarized', {
    text: {
      primary: 'white',
      secondary: '#2aa198',
    },
    background: {
      default: 'transparent',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  return <div>
    <button className='post_btn btn__type__primary' onClick={() => navigate(-1)}>{'< '}Назад</button>
    <div className='admin'>
      <h1>Статистика</h1>
    </div>
    {/* диаграммa */}
    <div className='diagram' id='chartsId' />
    {/* таблица */}
    <div className='table'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        title="Таблица постов"
        theme="solarized"
      >
      </DataTable>
    </div>
  </div>
}
