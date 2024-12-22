import { Box, Typography } from '@mui/material'
import React from 'react'
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import EllipsesSvg from './EllipsesSvg';
import Image from 'next/image';
import { GoldImg } from '../assets';

const data = [
    { label: "Yellow Gold", value: 120, color: "#FFD700", quantity: "20KG" },
    { label: "Rose Gold", value: 150, color: "#E19724", quantity: "20KG" },
    { label: "White Gold", value: 60, color: "#F8BA2A", quantity: "20KG" },
    { label: "Green Gold", value: 110, color: "#C9A800", quantity: "20KG" },
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

const GoldStock = () => {
    return (
        <>
            <Box className="flex flex-col gap-6 border border-primary100 rounded-[8px] w-full h-full">
                <Typography className="text-base font-normal px-6 pt-6">
                    Gold Stock
                </Typography>
                <Box className="pb-6 px-6 flex justify-between items-center gap-[32px]">
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
                        <Box className="absolute top-[70px] left-[75px]">
                            <Image src={GoldImg} alt='gold' />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default GoldStock