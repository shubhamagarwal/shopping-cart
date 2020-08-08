import React from 'react';

const Filter = (props) => {
    const { filters } = props;
    let colourArr = [];
    let priceArr = [];
    let brandArr = [];
    filters.length && filters.forEach(data => {
        if(data.type === 'COLOUR') {
            colourArr.push(data.values);
        }
        if(data.type === 'PRICE') {
            priceArr.push(data.values);
        }
        if(data.type === 'BRAND') {
            brandArr.push(data.values);
        }
    })

    console.log('colourArr', colourArr[0])
    return(
        <div className="filter-desc">
            <section>
                <div className="filter-header">
                    <div className="filter-heading"><span>Filters</span></div>
                    <div className="reset-filter"><span>Reset Filter</span></div>
                </div>
            </section>
            <section>
                <div>
                    <div className="color-title"><span>Colour</span></div>
                </div>
                <div className="color-container">
                    {colourArr[0] && colourArr[0].map(value => {
                        return(
                            <div className="color-item" key={value.color}>
                                
                                    <input type="checkbox" />
                                    <span>{value.title}</span>
                                
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
                            {priceArr[0] && priceArr[0].map(value => {
                                return(
                                <option key={value.key} value={value.key}>{value.displayValue}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="to">To</div>
                    <div className="max-range">
                        <select>
                            {priceArr[0] && priceArr[0].map(value => {
                                return(
                                <option key={value.key} value={value.key}>{value.displayValue}</option>
                                )
                            })}
                        </select>
                    </div>
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
                        {brandArr[0] && brandArr[0].map((value,i) => {
                            return(
                                <div className="brand-item" key={i}>
                                    <input type="checkbox" value={value.value}/>
                                    <span>{value.title}</span>
                                </div>
                            )
                        })}
                    </div>           
                </div>
            </section>
        </div>
    )
}

export default React.memo(Filter);