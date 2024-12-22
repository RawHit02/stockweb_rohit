import { Box, Typography } from '@mui/material'
import React from 'react'
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import EllipsesSvg from './EllipsesSvg';
import { SilverImg } from '../assets';
import Image from 'next/image';

const data = [
    { label: "Fine (99.9% Pure)", value: 120, color: "#93cdff", quantity: "20KG" },
    { label: "Sterling  (92.5% Pure)", value: 80, color: "#5eacd5", quantity: "20KG" },
    { label: "Britannia (95.8% Pure)", value: 140, color: "#318e9f", quantity: "20KG" },
    { label: "Coin (90% Pure)", value: 60, color: "#196e72", quantity: "20KG" },
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

const SilverStock = () => {
    return (
        <>
            <Box className="flex flex-col gap-6 border border-primary100 rounded-[8px] w-full h-full">
                <Typography className="text-base font-normal px-6 pt-6">
                    Silver Stock
                </Typography>
                <Box className="pb-6 px-6 flex flex-row justify-between items-center gap-[32px]">
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
                         <Box className="absolute top-[76px] left-[68px]">
                            <Image src={SilverImg} alt='silver' />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SilverStock