import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal } from 'bootstrap';

import CouponModal from '../../conponents/CouponModal';
import DeleteModal from '../../conponents/DeleteModal';
import Pagination from '../../conponents/Pagination';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [pagination, setPagintion] = useState({})
  const [type, setType] = useState('create')
  const [templeCoupon, setTempleCoupon] = useState({})
  const couponModal = useRef(null)
  const deleteModal = useRef(null)

  const openModal = (type, coupon) => {
    setType(type)
    setTempleCoupon(coupon)
    couponModal.current.show()
  }
  const closeModal = () => {
    couponModal.current.hide()
  }
  const openDeleteModal = (coupon) => {
    console.log(coupon)
    setTempleCoupon(coupon)
    deleteModal.current.show()
  }
  const closeDeleteModal = () => {
    deleteModal.current.hide()
  }
  const getCoupons = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`)
    console.log(res.data)
    setCoupons(res.data.coupons)
    setPagintion(res.data.pagination)
    console.log(res.data)
  }
  const deleteCoupon = async (id) => {
    try {
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`)
      closeDeleteModal()
      getCoupons()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    couponModal.current = new Modal('#couponModal', { backdrop: 'static' });
    deleteModal.current = new Modal('#deleteModal', { backdrop: 'static' });
    getCoupons()
  }, [])

  return (
    <div className="w-100">
      <CouponModal
        closeModal={closeModal}
        getCoupons={getCoupons}
        type={type}
        templeCoupon={templeCoupon} />
      <DeleteModal
        close={closeDeleteModal}
        text={templeCoupon.title}
        handleDelete={deleteCoupon}
        id={templeCoupon.id} />
      {/* Products */}
      <div className="p-3">
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => { openModal('create', {}) }}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">名稱</th>
              <th scope="col">折扣比</th>
              <th scope="col">到期日</th>
              <th scope="col">折扣碼</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.title}</td>
                  <td>{coupon.percent}</td>
                  <td>{coupon.due_date}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => { openModal('edit', coupon) }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => { openDeleteModal(coupon) }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
        <Pagination
          pagination={pagination}
          changPage={getCoupons}
        />
      </div>
      {/* Products end */}
    </div>
  )
}
