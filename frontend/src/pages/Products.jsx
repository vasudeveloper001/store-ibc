import { useEffect, useState } from "react"

import Product from "../components/Product/Product.component"
import Filters from "../components/Product/Filters/Filters.component"
import Loader from "../components/Loading/Loading.component"
import Paginations from "../components/Product/Paginations/Paginations.component"
import Message from "../components/Messages/Message.component"
import Sortings from "../components/Product/Sortings/Sortings.component"

import * as ProductsStyle from "../components/Product/Product.styles"
import { FaFilter, FaSort } from "react-icons/fa"

import { prices, ratings, availability, assured, brands } from "../data"

import { useDispatch, useSelector } from "react-redux"
import { getProductsList } from "../redux/action-creators/product-action-creator"
import { getCategoriesList } from "../redux/action-creators/category-action-creator"

const Products = ({ history, location, match }) => {
  const dispatch = useDispatch()
  const { loadingProducts, products, errorProducts } = useSelector(
    (state) => state.productsList
  )
  const { loadingCategories, categories, errorCategories } = useSelector(
    (state) => state.categoriesList
  )
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  useEffect(() => {
    dispatch(getProductsList())
    dispatch(getCategoriesList())
  }, [dispatch])

  const toggleFilterHandler = () => {
    setIsFilterOpen((prevStatus) => !prevStatus)
  }

  const toggleSortHandler = () => {
    setIsSortOpen((prevStatus) => !prevStatus)
  }

  if (loadingProducts || loadingCategories) return <Loader />
  if (errorProducts)
    return (
      <Message variant="error" margin="2rem auto">
        {errorProducts}
      </Message>
    )
  if (errorCategories)
    return (
      <Message variant="error" margin="2rem auto">
        {errorCategories}
      </Message>
    )
  return (
    <>
      <ProductsStyle.ButtonActions>
        <ProductsStyle.SButton fs="1.2rem" sm={1} onClick={toggleFilterHandler}>
          <FaFilter />
          Filter
        </ProductsStyle.SButton>
        <ProductsStyle.SButton fs="1.2rem" sm={1} onClick={toggleSortHandler}>
          <FaSort />
          Sort
        </ProductsStyle.SButton>
      </ProductsStyle.ButtonActions>
      <ProductsStyle.SContainer>
        <Filters
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={toggleFilterHandler}
          categories={categories}
          prices={prices}
          ratings={ratings}
          brands={brands}
          availability={availability}
          assured={assured}
        />
        <ProductsStyle.ListingsSection>
          <Sortings isSortOpen={isSortOpen} setIsSortOpen={toggleSortHandler} />
          <ProductsStyle.Section>
            {products?.map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </ProductsStyle.Section>
          <ProductsStyle.PaginationSection>
            <Paginations />
          </ProductsStyle.PaginationSection>
        </ProductsStyle.ListingsSection>
      </ProductsStyle.SContainer>
    </>
  )
}

export default Products
