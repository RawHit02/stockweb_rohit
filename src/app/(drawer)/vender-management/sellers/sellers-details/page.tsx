"use client";
import React, { useEffect, useState , Suspense } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {
  AddressIcon,
  BlockIcon,
  ContentCopyIcon,
  DeleteIcon,
  DiamondImage,
  DummyProfile,
  EmailIcon,
  KeyboardArrowDownIcon,
  LocalPhoneIcon,
  SearchIcon,
  ShareOutlinedIcon,
  TransactionIcon,
  UserProfileIcon,
  WhatsappIcon,
} from "@/app/assets";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {useSearchParams} from 'next/navigation';
import {GET_ALL_SELLERS_NEW} from '@/base-url/apiRoutes';
import { SellerDetailsModel } from "@/models/req-model/VendorManagementSellerModel";
import TransactionTable from "@/app/components/TransactionTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


const BoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const PriceSlider = styled(Slider)(({ theme }) => ({
  color: "#B6D063",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 8,
    width: 8,
    backgroundColor: "#092E20",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: BoxShadow,
      },
    },
    "&:before": {
      boxShadow:
        "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: 2,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&::before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "#000",
      ...theme.applyStyles("dark", {
        color: "#fff",
      }),
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 2,
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    boxShadow: "inset 0px 0px 4px -2px #000",
    backgroundColor: "#092E20",
  },
  ...theme.applyStyles("dark", {
    color: "#0a84ff",
  }),
}));
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="px-4">
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SellersDetails = () => {

  const searchParams = useSearchParams();
  const encodeId = searchParams.get("id");
  const sellerId = encodeId ? atob(encodeId) : null;

  const [value, setValue] = useState(0);
  const [age, setAge] = useState("");

  

  const [sellerDetails, setSellerDetails] = useState<SellerDetailsModel | null>(
    null
  );
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);



   useEffect(() => {
    const fetchSellerDetails = async () => {
      if (!sellerId) return;

      try {
        const response = await fetch(GET_ALL_SELLERS_NEW);
        const result = await response.json();

        if (result?.statusCode === 200) {
          const seller = result.data.find(
            (item: any) => item.id === sellerId
          );
          if (seller) {
            setSellerDetails(seller);
          } else {
            setError("seller not found.");
          }
        } else {
          setError("Failed to fetch seller details.");
        }
      } catch (err) {
        console.error("Error fetching seller details:", err);
        setError("Error fetching seller details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [sellerId]);

   if (loading) return <Typography>Loading...</Typography>;
   if (error) return <Typography>{error}</Typography>;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <Box className="bg-white rounded-xl py-2 h-[calc(100vh-116px)] overflow-auto">
        <Box sx={{ width: "100%" }} className="primary-tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            aria-label="full width tabs example"
            className="px-4 pb-2"
          >
            <Tab
              icon={<Image src={UserProfileIcon} alt="tab" />}
              iconPosition="start"
              label="User Profile"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Image src={TransactionIcon} alt="tab" />}
              iconPosition="start"
              label="Transaction"
              {...a11yProps(1)}
            />
          </Tabs>
          <Divider className="border-2 border-primaryExtraLight" />
          
          <TabPanel value={value} index={0}>
            <Typography className="text-2xl font-bold mt-5">
              User Profile
            </Typography>
            <Box className="border border-primary100 rounded-lg p-6 mt-4">
              <Box className="bg-primaryExtraLight flex items-center justify-between rounded-2xl p-4 pr-0 linear-gradient-bg">
                <Box className="flex items-center gap-4">
                  <Box className="w-[112px] h-[112px] rounded-full border-[8px] border-[#EEF2FF] overflow-hidden">
                    <Image src={DummyProfile} alt="profile" />
                  </Box>
                  <Box>
                    <Typography className="text-primary text-2xl font-bold leading-6">
                      {sellerDetails?.name} (Seller)
                    </Typography>
                    <Box className="flex items-center gap-2 mt-3">
                      <EmailIcon className="text-primary200 text-xl" />
                      <Typography className="text-sm text-primary">
                        {sellerDetails?.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Image src={DiamondImage} alt="diamond" />
                </Box>
              </Box>
              <Box className="flex items-center gap-[10px] mt-[10px]">
                <Box className="border border-primary100 rounded-lg p-5 max-w-[249px] w-full">
                  <Typography className="text-primary500 font-semibold text-base">
                    TOTAL DUES
                  </Typography>
                  <Typography className="text-primary text-sm mt-2">
                    -No Dues-
                  </Typography>
                </Box>
                <Box className="border border-primary100 rounded-lg p-5 max-w-[249px] w-full">
                  <Typography className="text-primary500 font-semibold text-base">
                    TOTAL SELL
                  </Typography>
                  <Typography className="text-primary text-sm mt-2">
                    $-50000.00
                  </Typography>
                </Box>
              </Box>
              <Box className="mt-6 flex flex-col gap-4">
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <LocalPhoneIcon className="text-gray100" />
                    <Typography className="text-primary text-sm">
                      {sellerDetails?.contactNumber}
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className="text-purple100 text-sm">
                      +91 9045896 325
                    </Typography>
                    <ContentCopyIcon className="text-gray100 text-lg" />
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <Image src={WhatsappIcon} alt="whatsapp" />
                    <Typography className="text-primary text-sm">
                      {sellerDetails?.whatsappNumber}
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    <Typography className="text-purple100 text-sm">
                      +91 9045896 325
                    </Typography>
                    <ContentCopyIcon className="text-gray100 text-lg" />
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center gap-2">
                    <Image src={AddressIcon} alt="address" />
                    <Typography className="text-primary text-sm">
                      {sellerDetails?.address}
                    </Typography>
                  </Box>
                  <Typography className="text-purple100 text-sm">
                    2337 Kildeer Drive, Kentucky, Canada
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="border border-primary100 rounded-lg p-6 mt-4 flex flex-col gap-3">
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2">
                  <BlockIcon className="text-gray100 text-xl" />
                  <Typography className="text-primary text-sm">
                    Block
                  </Typography>
                </Box>
                <Switch className="primary-switch" />
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center gap-2">
                  <Image src={DeleteIcon} alt="delete" />
                  <Typography className="text-primary text-sm">
                    You can delete account
                  </Typography>
                </Box>
                <Typography className="text-error200 text-base cursor-pointer">
                  Delete Account
                </Typography>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className="mt-5">
              <Box className="flex items-center gap-[10px]">
                <Typography className="text-2xl font-bold">Ledger</Typography>
                <Box className="flex items-center gap-3">
                  <ShareOutlinedIcon className="text-primary500" />
                  <Typography className="text-primary500 text-base">
                    Share
                  </Typography>
                </Box>
              </Box>
              <Box className="flex items-center gap-2 mt-4">
                <Box className="w-full primary-datepicker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Choose Start Date" name="startDate" />
                  </LocalizationProvider>
                </Box>
                <Box className="w-full primary-datepicker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Choose End Date" name="endDate" />
                  </LocalizationProvider>
                </Box>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-1" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Item
                    </MenuItem>
                    <MenuItem value={10}>Diamond</MenuItem>
                    <MenuItem value={20}>Gold</MenuItem>
                    <MenuItem value={30}>Silver</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-1" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Price
                    </MenuItem>
                    <MenuItem value={10}>Less than 5000</MenuItem>
                    <MenuItem value={20}>1 Lakh</MenuItem>
                    <MenuItem value={30}>3 Lakh</MenuItem>
                    <Box className="px-[14px] mt-3">
                      <Typography>Range</Typography>
                      <PriceSlider
                        aria-label="ios slider"
                        defaultValue={[60, 90]}
                        valueLabelDisplay="on"
                      />
                    </Box>
                    <Box></Box>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-1" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Payment Method
                    </MenuItem>
                    <MenuItem value={10}>Diamond</MenuItem>
                    <MenuItem value={20}>Gold</MenuItem>
                    <MenuItem value={30}>Silver</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={age}
                    onChange={handleChangeSelect}
                    displayEmpty
                    IconComponent={() => (
                      <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-1" />
                    )}
                  >
                    <MenuItem disabled value="">
                      Status
                    </MenuItem>
                    <MenuItem value={10}>Diamond</MenuItem>
                    <MenuItem value={20}>Gold</MenuItem>
                    <MenuItem value={30}>Silver</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className="min-w-[121px] h-[42px]"
                  variant="contained"
                  size="large"
                  color="primary"
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </Box>
              <Box className="mt-4">
                <TransactionTable />
              </Box>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

const WrappedSellersDetails = () => (
  <Suspense fallback={<Typography>Loading Supplier Details...</Typography>}>
    <SellersDetails />
  </Suspense>
);

export default WrappedSellersDetails;
