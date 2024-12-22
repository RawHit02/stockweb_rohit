import { Box, Typography } from '@mui/material'
import React from 'react'
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import EllipsesSvg from './EllipsesSvg';
import Image from 'next/image';
import { DiamondImg } from '../assets';

const data = [
    { label: "Round", value: 120, color: "#0F4E36", quantity: "20CT" },
    { label: "Princess", value: 100, color: "#1A8779", quantity: "20CT" },
    { label: "Emerald", value: 100, color: "#20A493", quantity: "20CT" },
    { label: "Cushion", value: 100, color: "#3FE0A3", quantity: "20CT" },
    { label: "Asscher", value: 170, color: "#25C387", quantity: "20CT" },
    { label: "Marquise", value: 170, color: "#50DDA8", quantity: "20CT" },
    { label: "Oval", value: 170, color: "#6DE3B6", quantity: "20CT" },
    { label: "Radiant", value: 120, color: "#8AE9C5", quantity: "20CT" },
    { label: "Pear", value: 100, color: "#A8EED3", quantity: "20CT" },
    { label: "Heart", value: 120, color: "#C5F4E2", quantity: "20CT" },
];

const sizing = {
    margin: { right: 5 },
    width: 206,
    height: 206,
    legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
};

const DiamodStock = () => {
    return (
        <>
            <Box className="flex flex-col gap-6 border border-primary100 rounded-[8px] w-full h-full">
                <Typography className="text-base font-normal px-6 pt-6">
                    Diamond Stock
                </Typography>
                <Box className="pb-6 px-6 flex justify-between gap-[32px]">
                    <Box className="w-full flex flex-col gap-2">
                        {
                            data.map((data, index) => {
                                return (
                                    <Box className="flex justify-between" key={index}>
                                        <Box className="flex gap-1 items-center">
                                            <Box>
                                                <EllipsesSvg size={12} color={data.color} />
                                            </Box>
                                            <Box>
                                                <Typography className="text-xs font-normal">
                                                    {data.label}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography className="text-xs font-normal">{data.quantity}</Typography>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box className="relative">
                        <PieChart
                            series={[
                                {
                                    innerRadius: 60,
                                    data,
                                    arcLabel: getArcLabel,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fontSize: 12,
                                },
                            }}
                            {...sizing}
                        />
                        <Box className="absolute top-[81px] left-[68px]">
                            <Image src={DiamondImg} alt='diamond' />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DiamodStock