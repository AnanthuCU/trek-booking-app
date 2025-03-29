import React from 'react'
import styles from "./searchComponent.module.css"
import CloseInputSvg from '../SvgComponents/CloseInputSvg';

type Props = {
  inputType: string;
  placeHolder: string;
  searchText: string;
  title: string;
  value: number | string;
  setSearch: any;
  search: number;
  handleSearch: any;
  setChartSearch: any;
  min?: number;
  max?: number;
}

const SearchComponent = (
  {
    inputType,
    placeHolder,
    searchText,
    title,
    value,
    setSearch,
    search,
    handleSearch,
    setChartSearch,
    min, max
  }: Props) => {

  const handleReset = () => {

    setChartSearch(0);
    setSearch(0)
  }

  const onChange = (e: any) => {
    let sr =  e.target.value;
    if (sr >= 0 && sr < 721) {
        setSearch(e.target.value)
    } 
  }

  return (
    <div className={styles.SearchContainer}>
      <p>{title}</p>
      <form className={styles.SearchWrapper}>

        <div className={styles.inputWrapper}>
          {value ?
            <div onClick={handleReset}>
              <CloseInputSvg />
            </div> : ""
          }
          <input
          min={1} max={720}
          value={value ? value : placeHolder} 
          
          onChange={onChange} type={inputType} placeholder={placeHolder}
          />
          {/* <small>Rank cannot be more than 720</small>
          <small>Rank cannot be less than 1</small> */}
        </div>

        <button type={"submit"} onClick={(e)=>handleSearch(e)}>
          {searchText}
        </button>
      </form>
    </div>
  )
}

export default SearchComponent

