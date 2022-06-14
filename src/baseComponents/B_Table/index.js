import appStyle from 'app/style.css'
import style from './style.css'
import React from 'react'
import { Box } from '@primer/react'
import { title } from 'process';

const index = ({
  headers, listData
}) => {
  return (
   
    <table width='100%'>
      <tr className={style.bHeader}>
      { headers.map((title, i) => {
        return  (
          <>
              <th key={i}>{title}</th>
          </>
        )
      })}
      </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
      <td>50</td>      
    </tr>

  </table>
   
  );
};

export default index;