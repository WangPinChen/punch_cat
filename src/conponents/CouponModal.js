import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CouponModal({
  closeModal,
  getCoupons,
  type,
  templeCoupon
}) {
  const [data, setData] = useState({
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: "testCode"
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'percent') {
      setData({
        ...data,
        [name]: Number(value)
      })
    } else if (name === 'is_enabled') {
      setData({
        ...data,
        [name]: +e.target.checked
      })
    } else {
      setData({
        ...data,
        [name]: value
      })
    }
  }

  const handleSubmit = () => {
    let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
    let method = 'post';
    if (type === 'edit') {
      api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${templeCoupon.id}`
      method = 'put'
    }
    (async () => {
      try {
        await axios[method](api, { data })
        getCoupons()
        closeModal()
      } catch (error) {
        console.log(error)
      }
    })();
  }

  useEffect(() => {
    if (type === 'create') {
      setData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: "testCode"
      })
    } else if (type === 'edit') {
      setData(templeCoupon)
    }
  }, [type, templeCoupon])

  return (
    <div
      className='modal fade'
      id='couponModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              建立新優惠券
            </h1>
            <button type='button' className='btn-close' aria-label='Close' />
          </div>
          <div className='modal-body'>
            <div className='mb-2'>
              <label className='w-100' htmlFor='title'>
                標題
                <input
                  type='text'
                  id='title'
                  placeholder='請輸入標題'
                  name='title'
                  className='form-control mt-1'
                  value={templeCoupon.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='percent'>
                  折扣（%）
                  <input
                    type='text'
                    name='percent'
                    id='percent'
                    placeholder='請輸入折扣（%）'
                    className='form-control mt-1'
                    value={templeCoupon.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='due_date'>
                  到期日
                  <input
                    type='date'
                    id='due_date'
                    name='due_date'
                    placeholder='請輸入到期日'
                    className='form-control mt-1'
                    value={templeCoupon.due_date}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='code'>
                  優惠碼
                  <input
                    type='text'
                    id='code'
                    name='code'
                    placeholder='請輸入優惠碼'
                    className='form-control mt-1'
                    value={templeCoupon.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className='form-check-label' htmlFor='is_enabled'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                value={templeCoupon.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={handleSubmit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
