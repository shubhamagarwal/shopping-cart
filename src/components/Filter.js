import React from 'react';

const Filter = (props) => {
    const { filters, resetFilter, handleFilter } = props;
    const filterData = React.useMemo(() => {
        let filterObj = {}
        filters.length && filters.forEach(data => {
            if(data.type === 'COLOUR') {
                filterObj = {...filterObj, colourArr: data.values}
            }
            if(data.type === 'PRICE') {
                filterObj = {...filterObj, priceArr: data.values}
                // var abc = data.values.splice(0,1)
                // filterObj = {...filterObj, priceArr1: abc}

            }
            if(data.type === 'BRAND') {
                filterObj = {...filterObj, brandArr: data.values}
            }
            
        })
        
        return filterObj;
    },[filters])
    console.log('filters',filters)
    return(
        <div className="filter-desc">
             <section>
                <div className="filter-header">
                    <div className="filter-heading"><span>Filters</span></div>
                    <div className="reset-filter"><span onClick={resetFilter}>Reset Filter</span></div>
                </div>
            </section>
            <section>
                <div>
                    <div className="brand-title"><span>Brand</span></div>
                </div>
                <div>
                     <div>
                         <input type="text" className="search-brand" placeholder="Search brand" />
                     </div>
                     <div className="brand-container">
                        {filterData && filterData.brandArr && filterData.brandArr.map((value,i) => {
                            return(
                                <div className="brand-item" key={i}>
                                    <input type="checkbox" value={value.value} onClick={(e) => handleFilter(e, 'brand')}/>
                                    <span>{value.title}</span>
                                </div>
                            )
                        })}
                    </div>           
                </div>
            </section>
            <section>
                <div>
                    <div className="color-title"><span>Colour</span></div>
                </div>
                <div className="color-container">
                    {filterData && filterData.colourArr && filterData.colourArr.map(value => {
                        return(
                            <div className="color-item" key={value.color}>
                                
                                    <input type="checkbox" value={value.color} onClick={(e) => handleFilter(e, 'color')} />
                                    <span>{value.title}</span>
                                
                            </div>
                        )
                    })}
                </div>
            </section>
            <section>
                <div>
                    <div className="Rating-title"><span>Rating</span></div>
                </div>
                <div className="rating-container">
                    {[1,2,3,4,5].map(value => {
                        return(
                            <div className="rating-item" key={value}>
                                
                                    <input type="checkbox" value={value} onClick={(e) => handleFilter(e, 'rating')} />
                                    <span>{value}</span>
                                
                            </div>
                        )
                    })}
                </div>
            </section>
            <section>
                <div>
                    <div className="price-title"><span>Price</span></div>
                </div>
                <div className="price-container">
                    <div className="min-range">
                        <select>
                            {filterData && filterData.priceArr && filterData.priceArr.map(value => {
                                return(
                                <option key={value.key} value={value.key}>{value.displayValue}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="to">To</div>
                    <div className="max-range">
                        <select>
                            {filterData && filterData.priceArr && filterData.priceArr.map(value => {
                                return(
                                <option key={value.key} value={value.key}>{value.displayValue}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default React.memo(Filter);