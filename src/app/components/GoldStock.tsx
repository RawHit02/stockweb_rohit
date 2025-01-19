"use client";

import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import EllipsesSvg from "./EllipsesSvg";
import Image from "next/image";
import { GoldImg } from "../assets";

const colors = ["#FFD700", "#E19724", "#F8BA2A", "#C9A800"];

interface OrnamentItem {
  id: string;
  createdBy?: string;
  createdDate?: string;
  updatedDate?: string;
  isDeleted?: boolean;
  ornamentType?: string;
  ornamentForm?: string;
  ornamentPurity?: string;
  ornamentColor?: string;
  ornamentGrade?: string;
}

interface OrnamentDetails {
  id: string;
  ornamentName: string;
  ornamentType?: OrnamentItem[];
  ornamentForm?: OrnamentItem[];
  ornamentPurity?: OrnamentItem[];
  ornamentColor?: OrnamentItem[];
  ornamentGrade?: OrnamentItem[];
}

interface GoldStockProps {
  goldData: OrnamentDetails;
}

const GoldStock: React.FC<GoldStockProps> = ({ goldData }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const transformData = () => {
    if (!goldData) return [];

    const categories = [
      {
        name: "Type",
        items: goldData.ornamentType || [],
        itemNames: (goldData.ornamentType || [])
          .map((item) => item.ornamentType)
          .join(", "),
      },
      {
        name: "Form",
        items: goldData.ornamentForm || [],
        itemNames: (goldData.ornamentForm || [])
          .map((item) => item.ornamentForm)
          .join(", "),
      },
      {
        name: "Purity",
        items: goldData.ornamentPurity || [],
        itemNames: (goldData.ornamentPurity || [])
          .map((item) => item.ornamentPurity)
          .join(", "),
      },
    //   {
    //     name: "Color",
    //     items: goldData.ornamentColor || [],
    //     itemNames: (goldData.ornamentColor || [])
    //       .map((item) => item.ornamentColor)
    //       .join(", "),
    //   },
    ];

    const totalItems = categories.reduce(
      (sum, category) => sum + category.items.length,
      0
    );

    return categories.map((category, index) => ({
      category: category.name,
      value: category.items.length,
      color: colors[index % colors.length],
      percentage: ((category.items.length / totalItems) * 100).toFixed(1),
      itemNames: category.itemNames, // Include the names of the items
    }));
  };

  const data = transformData();
  console.log("Transformed Gold Data:", transformData());

  const handleMouseOver = (
    event: React.MouseEvent,
    category: string,
    itemNames: string
  ) => {
    setTooltipContent(`${category}: ${itemNames}`);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseOut = () => {
    setTooltipContent(null);
    setTooltipPosition(null);
  };

  const sizing = {
    margin: { right: 5 },
    width: 206,
    height: 206,
    legend: { hidden: true },
  };

  const getArcLabel = (params: DefaultizedPieValueType) => `${params.value}%`;

  return (
    <Box className="flex flex-col gap-6 border border-primary100 rounded-[8px] w-full h-full">
      <Typography className="text-base font-normal px-6 pt-6">
        Gold Stock
      </Typography>
      <Box className="pb-6 px-6 flex justify-between gap-[32px]">
        <Box className="w-full flex flex-col gap-2">
          {data.map((item, index) => (
            <Box className="flex items-center gap-2" key={index}>
              <EllipsesSvg size={12} color={item.color} />
              <Typography className="text-xs font-normal">
                {item.category}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box className="relative">
          <PieChart
            series={[
              {
                innerRadius: 60,
                data: data.map((item) => ({
                  ...item,
                  onMouseOver: (event: any) =>
                    handleMouseOver(
                      event.nativeEvent,
                      item.category,
                      item.itemNames
                    ),
                  onMouseOut: handleMouseOut,
                })),
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
            <Image src={GoldImg} alt="gold" />
          </Box>
        </Box>

        {/* Tooltip */}
        {tooltipContent && tooltipPosition && (
          <Box
            sx={{
              position: "absolute",
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "8px",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            <Typography className="text-xs">{tooltipContent}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GoldStock;
