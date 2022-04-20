import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import loadSpinnerRules from "redux/thunks/SpinnerRules.thunk";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const FortuneWheelRules = ({ spinnerRules }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (spinnerRules.length <= 0) {
            dispatch(loadSpinnerRules());

            console.log("heu");
            setTimeout(spinnerRules, 3000);
        }
    }, [spinnerRules, dispatch]);

    const RADIAN = Math.PI / 180;

    const data = [
        { name: "A", value: 300 },
        { name: "B", value: 300 },
        { name: "C", value: 300 },
        { name: "D", value: 300 },
        { name: "E", value: 300 },
        { name: "F", value: 300 },
        { name: "G", value: 300 },
        { name: "H", value: 300 },
        { name: "I", value: 300 },
        { name: "J", value: 300 },
    ];

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name,
        value,
    }) => {
        let newAngle = midAngle - 31;
        let angleChange1 = 3.5;
        let angleChange2 = angleChange1 * 2;

        const radius = innerRadius + (outerRadius - innerRadius) * 0.375;
        const x1 = cx + radius * Math.cos(-newAngle * RADIAN);
        const y1 = cy + radius * Math.sin(-newAngle * RADIAN);
        const x2 = cx + radius * Math.cos((-newAngle + angleChange1) * RADIAN);
        const y2 = cy + radius * Math.sin((-newAngle + angleChange1) * RADIAN);
        const x3 = cx + radius * Math.cos((-newAngle + angleChange2) * RADIAN);
        const y3 = cy + radius * Math.sin((-newAngle + angleChange2) * RADIAN);

        return (
            <React.Fragment>
                <text
                    x={x1}
                    y={y1}
                    rotate={-newAngle + 90}
                    fill="white"
                    fontFamily="OpenSans-Bold"
                    fontSize={20}
                >
                    {3}
                </text>
                <text
                    x={x2}
                    y={y2}
                    rotate={-newAngle + 90 + angleChange1}
                    fill="white"
                    fontFamily="OpenSans-Bold"
                    fontSize={20}
                >
                    {0}
                </text>
                <text
                    x={x3}
                    y={y3}
                    rotate={-newAngle + 90 + angleChange2}
                    fill="white"
                    fontFamily="OpenSans-Bold"
                    fontSize={20}
                >
                    {0}
                </text>
            </React.Fragment>
            // <text
            //     x={x}
            //     y={y}
            //     fill="white"
            //     dominantBaseline="central"
            //     position="inside"
            //     fontSize={20}
            // >
            //     {name}
            // </text>
        );
    };
    return (
        <>
            <div className="fortune-wheel-rules-wrapper">
                <div className="outer-circle">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                label={renderCustomizedLabel}
                                labelLine={false}
                                innerRadius={"60%"}
                                outerRadius={"90%"}
                                paddingAngle={5}
                                cornerRadius={10}
                                isAnimationActive={false}
                                fill="#F9BF38"
                                dataKey="value"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default FortuneWheelRules;
