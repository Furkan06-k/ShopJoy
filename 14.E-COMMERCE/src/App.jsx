import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import { Router } from 'react-router-dom'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer } from './redux/slices/basketSlice'


function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [])

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {products && products.map((product) => {
            return (
              <div key={product.id}>
                <div className='flex-row' style={{ padding: '20px' }}>
                  <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} alt={product.title} />
                  <p style={{ width: '320px', marginRight: '5px' }}>{product.title} ({product.count})</p>
                  <p style={{ fontWeight: 'bold', marginRight: '10px', width: '70px' }}>{product.price} TL</p>
                  <button style={{ marginRight: '5px', padding: '5px', borderRadius: '5px', backgroundColor: 'red', border: 'none', color: '#fff', width: '50px' }}>Sil</button>
                </div>
                <hr />
              </div>
            );
          })}
          <div>
            <p style={{ textAlign: 'center' ,fontWeight:'bold' , fontSize:'18px'}}>Total Tutar: {totalAmount}</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App
