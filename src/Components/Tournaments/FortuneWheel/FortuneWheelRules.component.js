const FortuneWheelRules = ({spinnerRules}) => {

    let pizza = [];
    for (var i = 0; i < spinnerRules.length; i++) {
        pizza.push(
            <li id={ "slice-" + (i+1) } key={i}>
                <div className="slice">
                    <span>
                        <p>{ spinnerRules[i].tickets }</p>
                    </span>
                </div>
            </li>
)
    }

    return (
        <div className="fortune-wheel-rules-wrapper csstransforms">
            <div className="parallax-container">
                <div className="cn-wrapper opened-nav" id="cn-wrapper">
                    <div className="outer-circle d-flex align-items-center justify-content-center">
                        <ul className="slice-circle">
                            {pizza}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
        
};

export default FortuneWheelRules;