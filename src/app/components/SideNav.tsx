"use client";
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import {
  AdminIcon,
  AdminIconActive,
  ArrowDropDownIcon,
  ArrowForwardIosIcon,
  ArrowRightIcon,
  CoinsImg,
  DashboardIcon,
  DashboardIconActive,
  DummyProfile,
  EmployeeIcon,
  EmployeeIconActive,
  Hamburger,
  Logo1,
  LogoutOutlinedIcon,
  SettingsOutlinedIcon,
  ShortLogo,
  StockIcon,
  StockIconActive,
  VendorManagementicon,
  VendorManagementiconActive,
} from "../assets";
import Image from "next/image";
import localSessionStorage from "@/hooks/localSessionStorage";
import { useRouter } from "next/navigation";
import { StorageConstants } from "@/constants/StorageConstants";
import { NavDrawerItemsConstants } from "@/constants/NavDrawerItemsConstants";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type SideNavProps = {
  onPress: () => void;
  navOpen: boolean; // Define navOpen prop
};

const SideNav: React.FC<SideNavProps> = ({ onPress, navOpen }) => {
  // save Nav drawer info in Session Storage
  const { setItem } = localSessionStorage();

  const [anchorElVendor, setAnchorElVendor] =
    React.useState<null | HTMLElement>(null);
  const [anchorElEmployee, setAnchorElEmployee] =
    React.useState<null | HTMLElement>(null);
  const [anchorElStock, setAnchorElStock] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  const openVendor = Boolean(anchorElVendor);
  const openEmployee = Boolean(anchorElEmployee);
  const openStock = Boolean(anchorElStock);
  const openAdmin = Boolean(anchorElAdmin);
  const openProfile = Boolean(anchorElProfile);

  // Adding Router
  const router = useRouter();

  const drawerItemSelectionCLick = (event: any, item: string) => {
    event.preventDefault();
    router.push(`/${item}`);
    // dispatch(updateNavDrawer(item));
    setItem(StorageConstants.NAV_DRAWER_ITEM, item);
  };

  const handleClickVendor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElVendor(event.currentTarget);
  };
  const handleCloseVendor = () => {
    setAnchorElVendor(null);
  };

  const handleClickEmployee = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElEmployee(event.currentTarget);
  };
  const handleCloseEmployee = () => {
    setAnchorElEmployee(null);
  };

  const handleClickStock = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElStock(event.currentTarget);
  };
  const handleCloseStock = () => {
    setAnchorElStock(null);
  };

  const handleClickAdmin = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAdmin(event.currentTarget);
  };
  const handleCloseAdmin = () => {
    setAnchorElAdmin(null);
  };

  const handleClickProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const handleLogout = () => {
    // clear cookie
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/");
  };
 
 


  return (
    <>
      <Box className="w-full bg-primary h-[calc(100vh-32px)] rounded-xl px-4 pt-9 pb-4 flex flex-col justify-between overflow-auto">
        <Box>
          <Box
            className={`flex items-center ${
              navOpen ? "justify-between" : "justify-center gap-2"
            }`}
          >
            <Box>
              <Image src={navOpen ? Logo1 : ShortLogo} alt="logo" />
            </Box>
            <Box className="cursor-pointer" onClick={onPress}>
              <Image src={Hamburger} alt="logo" />
            </Box>
          </Box>
          <Box className="mt-9 flex flex-col gap-2">
            <Box
              className={`flex items-center gap-[6px] p-3 rounded-lg cursor-pointer bg-primary300 nav-item active ${
                !navOpen && "justify-center"
              }`}
            >
              <Image
                src={DashboardIcon}
                alt="dashboard"
                className="nav-item-icon"
              />
              <Image
                src={DashboardIconActive}
                alt="dashboard"
                className="nav-item-icon-active"
              />
              {navOpen && (
                <Typography className="text-sm text-white nav-item-label">
                  Dashboard
                </Typography>
              )}
            </Box>
            <Box>
              <Accordion elevation={0} className={`${navOpen ? "" : "hidden"}`}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className="arrow-down-icon" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image
                      src={VendorManagementicon}
                      alt="vendor"
                      className="vendor-m-icon"
                    />
                    <Image
                      src={VendorManagementiconActive}
                      alt="vendor"
                      className="vendor-m-icon-active"
                    />
                    <Typography>Vendor Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className="mt-2">
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.VENDOR_MANAGEMENT_BUYER
                          )
                        }
                        className="side-nav-child-label text-sm"
                      >
                        Buyers
                      </Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.VENDOR_MANAGEMENT_SELLERS
                          )
                        }
                        className="side-nav-child-label text-sm"
                      >
                        Suppliers
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
              <Box className={`${!navOpen ? "" : "hidden"}`}>
                <Button
                  id="basic-button"
                  aria-haspopup="true"
                  onClick={handleClickVendor}
                  className="h-[44px] w-[60px] bg-primary300 nav-item active"
                >
                  <Image
                    src={VendorManagementicon}
                    alt="vendor"
                    className="nav-item-icon"
                  />
                  <Image
                    src={VendorManagementiconActive}
                    alt="vendor"
                    className="nav-item-icon-active"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElVendor}
                  open={openVendor}
                  onClose={handleCloseVendor}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseVendor}>Buyers</MenuItem>
                  <MenuItem onClick={handleCloseVendor}>Sellers</MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box>
              <Accordion elevation={0} className={`${navOpen ? "" : "hidden"}`}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className="arrow-down-icon" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image
                      src={EmployeeIcon}
                      alt="vendor"
                      className="vendor-m-icon"
                    />
                    <Image
                      src={EmployeeIconActive}
                      alt="vendor"
                      className="vendor-m-icon-active"
                    />
                    <Typography>Employee</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className="mt-2">
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.MANAGE_EMPLOYEE
                          )
                        }
                      >
                        Manage Employee
                      </Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.TODAYS_ATTENDANCE
                          )
                        }
                      >
                        Today&apos;s Attendance
                      </Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.ATTENDANCE_SHEET
                          )
                        }
                      >
                        Attendance Sheet
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
              <Box className={`${!navOpen ? "" : "hidden"}`}>
                <Button
                  id="basic-button"
                  aria-haspopup="true"
                  onClick={handleClickEmployee}
                  className="h-[44px] w-[60px] bg-primary300 nav-item"
                >
                  <Image
                    src={EmployeeIcon}
                    alt="vendor"
                    className="nav-item-icon"
                  />
                  <Image
                    src={EmployeeIconActive}
                    alt="vendor"
                    className="nav-item-icon-active"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElEmployee}
                  open={openEmployee}
                  onClose={handleCloseEmployee}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseEmployee}>
                    Manage Employee
                  </MenuItem>
                  <MenuItem onClick={handleCloseEmployee}>
                    Today Attendance
                  </MenuItem>
                  <MenuItem onClick={handleCloseEmployee}>
                    Attendance Sheet
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box>
              <Accordion elevation={0} className={`${navOpen ? "" : "hidden"}`}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className="arrow-down-icon" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image
                      src={StockIcon}
                      alt="vendor"
                      className="vendor-m-icon"
                    />
                    <Image
                      src={StockIconActive}
                      alt="vendor"
                      className="vendor-m-icon-active"
                    />
                    <Typography>Stock Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className="mt-2">
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.STOCK_MANAGEMENT_INWARD
                          )
                        }
                      >
                        Inward
                      </Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.STOCK_MANAGEMENT_OUTWARD
                          )
                        }
                      >
                        Outward
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
              <Box className={`${!navOpen ? "" : "hidden"}`}>
                <Button
                  id="basic-button"
                  aria-haspopup="true"
                  onClick={handleClickStock}
                  className="h-[44px] p-0 w-[60px] bg-primary300 nav-item"
                >
                  <Image
                    src={StockIcon}
                    alt="vendor"
                    className="nav-item-icon"
                  />
                  <Image
                    src={StockIconActive}
                    alt="vendor"
                    className="nav-item-icon-active"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElStock}
                  open={openStock}
                  onClose={handleCloseStock}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseStock}>Inward</MenuItem>
                  <MenuItem onClick={handleCloseStock}>Outward</MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box>
              <Accordion elevation={0} className={`${navOpen ? "" : "hidden"}`}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className="arrow-down-icon" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image
                      src={AdminIcon}
                      alt="vendor"
                      className="vendor-m-icon"
                    />
                    <Image
                      src={AdminIconActive}
                      alt="vendor"
                      className="vendor-m-icon-active"
                    />
                    <Typography>Admin Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className="mt-2">
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.ADMIN_MANAGEMENT_USER_MANAGEMENT
                          )
                        }
                      >
                        Users
                      </Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className="side-nav-child-icon" />
                      <Typography
                        className="side-nav-child-label text-sm"
                        onClick={(e) =>
                          drawerItemSelectionCLick(
                            e,
                            NavDrawerItemsConstants.ADMIN_MANAGEMENT_ROLES_PERMISSION
                          )
                        }
                      >
                        Role & Permission
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Box className={`${!navOpen ? "" : "hidden"}`}>
                <Button
                  id="basic-button"
                  aria-haspopup="true"
                  onClick={handleClickAdmin}
                  className="h-[44px] p-0 w-[60px] bg-primary300 nav-item"
                >
                  <Image
                    src={AdminIcon}
                    alt="vendor"
                    className="nav-item-icon"
                  />
                  <Image
                    src={AdminIconActive}
                    alt="vendor"
                    className="nav-item-icon-active"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorElAdmin}
                  open={openAdmin}
                  onClose={handleCloseAdmin}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseAdmin}>Users</MenuItem>
                  <MenuItem onClick={handleCloseAdmin}>
                    Role & Permission
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          component="div"
          className="flex flex-col items-center cursor-pointer"
          onClick={(e: any) => handleClickProfile(e)}
        >
          {navOpen ? <Image src={CoinsImg} alt="coins" /> : ""}
          <Divider className="border-primary200 w-[95%] mb-4" />
          <Box
            className={`flex items-center gap-[10px] w-full ${
              navOpen ? "" : "justify-center"
            }`}
          >
            <Box className="w-[50px] h-[50px] rounded-full overflow-hidden">
              <Image src={DummyProfile} alt="prifile image" />
            </Box>
            <Box className={`${navOpen ? "" : "hidden"}`}>
              <Typography className="text-white font-medium">
                JOHN CARTER
              </Typography>
              <Typography className="text-sm text-primary200 font-medium">
                john@gmail.com
              </Typography>
            </Box>
            <ArrowForwardIosIcon
              className={`text-white text-sm ${navOpen ? "" : "hidden"}`}
            />
          </Box>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElProfile}
          open={openProfile}
          onClose={handleCloseProfile}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right", // Anchor point on the button
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right", // Transformation origin on the menu
          }}
        >
          <MenuItem
            onClick={() => {
              router.push("/user-profile");
              handleCloseProfile();
            }}
          >
            <Box className="text-baseBlack text-[14px] flex items-center gap-[6px]">
              <SettingsOutlinedIcon className="text-[20px]" />
              <Typography>Settings</Typography>
            </Box>
          </MenuItem>
          {/* <MenuItem onClick={handleLogout}> */}
          <MenuItem onClick={handleLogout}>
            <Box className="text-baseBlack text-[14px] flex items-center gap-[6px]">
              <LogoutOutlinedIcon className="text-[20px]" />
              <Typography>Logout</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default SideNav;
