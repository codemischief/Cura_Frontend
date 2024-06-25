import {
    Button, CircularProgress, Modal, Stack, Backdrop,
    MenuItem,
    Popover,
} from "@mui/material";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import { APIService } from "../../../services/API";
import { useDispatch } from "react-redux";
import {
    downloadbankBalanceReconcillation,
    getBankBalanceReconcilation,
    setInitialState,
} from "../../../Redux/slice/reporting/BankBalanceReconcilation";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import Container from "../../../Components/common/Container";
import { connectionDataColumn, connectionDataColumn1 } from "./Columns";
import { CloseOutlined, Refresh } from "@mui/icons-material";
import { FilePdfOutlined } from "@ant-design/icons";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png";
import useAuth from '../../../context/JwtContext';

const BankBalanceReconcilation = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { bankBalanceReconcilation, isLoading } = useSelector((state) => state.bankBalanceReconcilation);
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [showTable, setShowTable] = useState(false);
    const [paymentMode, setPaymentMode] = useState([]);
    const [bankName, setBankName] = useState("DAP-ICICI-42");
    const columns = useMemo(() => connectionDataColumn(), []);
    const columns1 = useMemo(() => connectionDataColumn1(), []);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    function floorDecimal(number) {
        let floorValue = Math.floor(number * 100) / 100; // Get floor value with two decimal places
        return floorValue.toFixed(2); // Convert to string with exactly two decimal places
    }

    const fetchPaymentMode = async () => {
        const data = {
            "user_id": user.id
        }
        const response = await APIService.getModesAdmin({ ...data, user_id: user.id });
        const result = (await response.json());
        setPaymentMode(result.data);

    }



    const handleDateChange = (e) => {
        let { name, value } = e.target;
        if (name === "startDate") {
            setStartDate(value);
        }

    };

    const handleRefresh = () => {
        let obj = {
            user_id: user.id,
            startdate: startDate ?? "2021-01-01",
            bankName: bankName,
            rows: "*",
            filters: []
        };
        dispatch(getBankBalanceReconcilation(obj));
    };

    useEffect(() => {
        fetchPaymentMode();
        dispatch(setInitialState());

    }, []);


    const downloadExcel = async () => {
        let obj = {
            user_id: user.id,
            startdate: startDate ?? "2021-01-01",
            bankName: bankName,
            rows: ["bankname", "payment", "receipt", "balance"],
            downloadType: "excel",
            colmap: {
                "bankname": "Bank Name",
                "payment": "Payment",
                "receipt": "Receipt",
                "balance": "Total Balance",
            },
        }
        dispatch(downloadbankBalanceReconcillation(obj));

    };

    const downloadPdf = () => {
        let obj = {
            user_id: user.id,
            startdate: startDate ?? "2021-01-01",
            bankName: bankName,
            rows: ["bankname", "payment", "receipt", "balance"],
            downloadType: "pdf",
            routename: "/reports/bankbalancereconciliation",
            colmap: {
                "bankname": "Bank Name",
                "payment": "Payment",
                "receipt": "Receipt",
                "balance": "Total Balance",
            },
        };
        dispatch(downloadbankBalanceReconcillation(obj, 'pdf'))
    }

    const handleShow = () => {
        if (startDate) {
            dispatch(setInitialState())
            setShowTable(true);
            let obj = {
                user_id: user.id,
                startdate: startDate ?? "2021-01-01",
                bankName: bankName,
                rows: "*",
                filters: []
            };
            dispatch(getBankBalanceReconcilation(obj));
        }

    };

    return (
        <Container >
            <Stack gap="1rem" sx={{ height: "100%" }}>
                <div className="flex flex-col px-4">
                    <div className="flex justify-between">
                        <HeaderBreadcrum
                            heading={"Bank Balance Reconciliation"}
                            path={["Reports", "Bank Records", "Bank Balance Reconciliation"]}
                        />
                        <div className="flex justify-between gap-7 h-[36px]">
                            {showTable && (
                                <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
                                    <p>
                                        Generated on: <span> {new Date().toLocaleString()}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Stack
                        marginTop={"8px"}
                        justifyContent={"space-between"}
                        direction={"row"}
                        alignItems={"center"}
                        height={"3.875rem"}
                    >
                        <Stack
                            direction={"row"}
                            justifyContent={"space-around"}
                            alignItems={"center"}
                            gap={"24px"}
                        >
                            <div className="">
                                <div className="text-sm">Bank Name <label className="text-red-500">*</label></div>
                                <select className="w-[160px] h-8 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="bankName" value={bankName} onChange={(e) => setBankName(e.target.value)} defaultValue="Bank Name" >
                                    <option value="all" hidden>All</option>
                                    {paymentMode.map(item => (
                                        <option key={item[0]} value={item[1]}>
                                            {item[1]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <DatePicker
                                label={"Select Start Date"}
                                onChange={handleDateChange}
                                name="startDate"
                                value={startDate}
                            />

                            <Button
                                variant="outlined"
                                //   onClick={handleShow}
                                sx={{
                                    height: "36px",
                                    textTransform: "none",
                                    color: "#004DD7",
                                    borderRadius: "8px",
                                    width: "133px",
                                    fontSize: "14px",
                                    border: "1px solid #004DD7",
                                    fontWeight: "600px",
                                    lineHeight: "18.9px",
                                    marginTop: "14px",
                                    "&:hover": {
                                        //you want this to be the same as the backgroundColor above
                                        backgroundColor: "#004DD7",
                                        color: "#fff",
                                    },
                                }}
                                onClick={handleShow}
                                disabled={!(startDate)}
                            >
                                Show
                            </Button>
                        </Stack>
                    </Stack>
                </div>
                <div className="flex flex-col gap-12 mt-7 h-full" >
                    <div className="flex flex-col gap-4">
                    <p className="font-semibold text-xl leading-[1.35]">Passbook Bank Balance</p>
                        <table style={{ width: "-webkit-fill-available" }}>
                            <thead className="sticky top-0 z-100 bg-white">
                                <tr className="bg-[#F0F6FF] h-[56px]  ">
                                    {columns.map((ele, index) => (
                                        <th key={index} >
                                            <div className="text-left break-words py-4 font-open-sans text-xs font-normal leading-6 justify-center min-w-[6rem]">
                                                {ele.title}

                                            </div>
                                        </th>

                                    ))}
                                </tr>
                            </thead>
                            <tbody className="">
                                {isLoading && (
                                    <tr>
                                        <td colSpan={1} className="text-center">
                                            <Modal
                                                open={isLoading}
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    invisible: true, // To make the backdrop invisible while loading
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: "100%",
                                                    }}
                                                >
                                                    <CircularProgress sx={{ color: "white" }} />
                                                </div>
                                            </Modal>
                                        </td>
                                    </tr>
                                )}
                                <>
                                    {Object.keys(bankBalanceReconcilation["bankstbalance"]).length === 0 && (
                                        <tr className="w-full h-full">
                                            <td
                                                className="w-full h-full"
                                                colSpan={columns.length + 1}
                                                align="center"
                                            >
                                                <div className="w-full h-full py-5 flex flex-col gap-3 items-start sm:items-center justify-center border-b dark:border-gray-700">
                                                    <p className="text-sm max-w-[10em] lg:max-w-none">
                                                        
                                                        No Record To Show In Passbook Bank Balance Table.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {Object.keys(bankBalanceReconcilation["bankstbalance"]).length > 0 && <tr
                                        key={"m"}
                                        className="border-b dark:border-gray-700 h-[56px] w-full"
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                colSpan={1}
                                                style={{
                                                    ...column.cellStyle,
                                                    paddingTop: "4px",
                                                    paddingBottom: "4px",
                                                }}
                                                className="py-3 text-left "
                                            >
                                                {column.render
                                                    ? (
                                                        <div className="flex justify-start items-center">
                                                            <p>1</p>
                                                        </div>
                                                    ) : (
                                                        bankBalanceReconcilation.bankstbalance && (column.field === "balance" || column.field === "payment" || column.field === "receipt")
                                                            ? floorDecimal(bankBalanceReconcilation.bankstbalance[column.field])
                                                            : bankBalanceReconcilation?.bankstbalance?.[column.field]
                                                    )
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                    }
                                </>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col gap-4">
                        
                        <p className="font-semibold text-xl leading-[1.35]">Application Bank Balance</p>
                        <table style={{ width: "-webkit-fill-available" }}>
                            <thead className="sticky top-0 z-100 bg-white">
                                <tr className="bg-[#F0F6FF] h-[56px]  ">
                                    {columns1.map((ele, index) => (

                                        <th key={index} >
                                            <div className="text-left break-words py-4 font-open-sans text-xs font-normal leading-6 justify-center min-w-[6rem]">
                                                {ele.title}

                                            </div>
                                        </th>

                                    ))}
                                </tr>
                            </thead>
                            <tbody className=" max-h-[calc(100vh-375px)]  overflow-y-auto">
                                <>
                                    {Object.keys(bankBalanceReconcilation["bankpmtrcps"]).length === 0 && (
                                        <tr className="w-full h-full">
                                            <td
                                                className="w-full h-full"
                                                colSpan={columns.length + 1}
                                                align="center"
                                            >
                                                <div className="w-full h-full py-5 flex flex-col gap-3 items-start sm:items-center justify-center border-b dark:border-gray-700">
                                                    <p className="text-sm max-w-[10em] lg:max-w-none">
                                                        No Record To Show In Application Bank Balance Table.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {Object.keys(bankBalanceReconcilation["bankpmtrcps"]).length > 0 && <tr
                                        key={"m"}
                                        className="border-b dark:border-gray-700 h-[56px] w-full"
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                colSpan={1}
                                                style={{
                                                    ...column.cellStyle,
                                                    paddingTop: "4px",
                                                    paddingBottom: "4px",
                                                }}
                                                className="py-3 text-left "
                                            >
                                                {column.render
                                                    ? (
                                                        <div className="flex justify-start items-center">
                                                            <p>1</p>
                                                        </div>
                                                    ) : (
                                                        bankBalanceReconcilation.bankpmtrcps && (column.field === "balance" || column.field === "payment" || column.field === "receipt")
                                                            ? floorDecimal(bankBalanceReconcilation.bankpmtrcps[column.field])
                                                            : bankBalanceReconcilation?.bankpmtrcps?.[column.field]
                                                    )
                                                }

                                            </td>
                                        ))}
                                    </tr>}
                                </>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div className="flex gap-3 justify-end p-4 border-t-2 border-[#CBCBCB]">
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        sx={{ top: "-70px", left: "-20px" }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <div className="flex justify-end">
                            <CloseOutlined onClick={() => setAnchorEl(null)} sx={{ color: "#787878", height: 20, width: 20, cursor: "pointer" }} />
                        </div>
                        <MenuItem
                            className="flex space-x-2 justify-center items-center ml-3 mt-3"
                            onClick={downloadPdf}
                            disabled={!setShowTable}
                        >
                            <p>Download as Pdf</p>
                            <img src={Pdf} />
                        </MenuItem>
                        <MenuItem
                            className="flex space-x-2 justify-center items-center ml-3 mt-3"
                            onClick={downloadExcel}
                            disabled={!setShowTable}
                        >
                            <p> Download as Excel</p>
                            <img src={Excel} />
                        </MenuItem>
                    </Popover>

                    <div
                        className="border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2 cursor-pointer"
                        disabled={!setShowTable}
                        onClick={handleRefresh}
                    >
                        <button>
                            <p>Refresh</p>
                        </button>
                        <Refresh sx={{ height: "16px", width: "16px" }} />
                    </div>
                    <div className="border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2">
                        <button
                            onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                            }}
                            disabled={!setShowTable}

                        >
                            <p>Download</p>
                        </button>
                        <FilePdfOutlined height={"16px"} width={"16px"} />
                    </div>
                </div>
            </Stack>
        </Container>
    );
};

export default BankBalanceReconcilation;
