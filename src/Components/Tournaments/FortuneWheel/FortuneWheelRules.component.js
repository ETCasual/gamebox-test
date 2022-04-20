import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import loadSpinnerRules from "redux/thunks/SpinnerRules.thunk";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { render } from "@testing-library/react";

const spinnerData = [];

const FortuneWheelRules = ({ spinnerRules }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        for (let i = 0; i < spinnerRules.length; i++) {
            spinnerData.push({ name: spinnerRules[i].tickets, value: 10 });
        }

        if (spinnerRules.length <= 0) {
            dispatch(loadSpinnerRules());
        }
    }, [spinnerRules, dispatch]);

    const RADIAN = Math.PI / 180;

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
        let startAngle = midAngle - 29;
        let angleOffset1 = 5;
        let angleOffset2 = angleOffset1 * 2;
        let angleOffset3 = angleOffset1 * 4;

        const radius = innerRadius + (outerRadius - innerRadius) * 0.375;
        const x1 = cx + radius * Math.cos(-startAngle * RADIAN);
        const y1 = cy + radius * Math.sin(-startAngle * RADIAN);
        const x2 =
            cx + radius * Math.cos((-startAngle + angleOffset1) * RADIAN);
        const y2 =
            cy + radius * Math.sin((-startAngle + angleOffset1) * RADIAN);
        const x3 =
            cx + radius * Math.cos((-startAngle + angleOffset2) * RADIAN);
        const y3 =
            cy + radius * Math.sin((-startAngle + angleOffset2) * RADIAN);

        let ticket = name + "";
        return (
            <React.Fragment>
                <text
                    className="spinner-rules-text"
                    x={x1}
                    y={y1}
                    rotate={-startAngle + 90}
                    fill="white"
                >
                    {ticket.charAt(0)}
                </text>
                <text
                    className="spinner-rules-text"
                    x={x2}
                    y={y2}
                    rotate={-startAngle + 90 + angleOffset1}
                    fill="white"
                >
                    {ticket.charAt(1)}
                </text>
                <text
                    className="spinner-rules-text"
                    x={x3}
                    y={y3}
                    rotate={-startAngle + 90 + angleOffset2}
                    fill="white"
                >
                    {ticket.charAt(2)}
                </text>
                <text
                    className="spinner-rules-text"
                    x={x3}
                    y={y3}
                    rotate={-startAngle + 90 + angleOffset2}
                    fill="white"
                >
                    {ticket.charAt(2)}
                </text>
            </React.Fragment>
        );
    };
    return (
        <>
            <div className="fortune-wheel-rules-wrapper">
                <div className="outer-circle">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={spinnerData}
                                label={renderCustomizedLabel}
                                labelLine={false}
                                innerRadius={"67.5%"}
                                outerRadius={"97.5%"}
                                paddingAngle={5}
                                cornerRadius={10}
                                isAnimationActive={false}
                                // color="linear-gradient(rgba(250, 250, 0, 0), transparent)"
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
