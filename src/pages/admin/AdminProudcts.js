import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Modal } from 'bootstrap';

import ProductModal from '../../conponents/ProductModal';
import DeleteModal from '../../conponents/DeleteModal';
import Pagination from '../../conponents/Pagination';

export default function AdminProudcts() {
  const [products, setProducts] = useState([])
  const [pagination, setPagintion] = useState({})
  const [type, setType] = useState('create')
  const [templeProduct, setTempleProduct] = useState({})
  const productModal = useRef(null)
  const deleteModal = useRef(null)

  const openProductModal = (type, product) => {
    setType(type)
    setTempleProduct(product)
    productModal.current.show()
  }
  const closeProductModal = () => {
    productModal.current.hide()
  }
  const openDeleteModal = (product) => {
    setTempleProduct(product)
    deleteModal.current.show()
  }
  const closeDeleteModal = () => {
    deleteModal.current.hide()
  }
  const getProducts = async (page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`)
    setProducts(res.data.products)
    setPagintion(res.data.pagination)
    console.log(res.data.pagination)
  }
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`)
      getProducts()
      closeDeleteModal()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    productModal.current = new Modal('#productModal', { backdrop: 'static' });
    deleteModal.current = new Modal('#deleteModal', { backdrop: 'static' });
    getProducts()
  }, [])

  return (
    <div className="w-100">
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        type={type}
        templeProduct={templeProduct} />
      <DeleteModal
        close={closeDeleteModal}
        text={templeProduct.title}
        handleDelete={deleteProduct}
        id={templeProduct.id} />
      {/* Products */}
      <div className="p-3">
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => { openProductModal('create', {}) }}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">名稱</th>
              <th scope="col">售價</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => { openProductModal('edit', product) }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => { openDeleteModal(product) }}
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
          changPage={getProducts}
        />
      </div>
      {/* Products end */}
    </div>
  )
}
