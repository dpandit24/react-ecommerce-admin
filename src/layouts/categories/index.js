// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "data/redux/category/categorySlice";
import MDButton from "components/MDButton";
import { createCategory } from "data/redux/category/categorySlice";
import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, TextField } from "@mui/material";
import { editCategory } from "data/redux/category/categorySlice";

function Categories() {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categories);
     // State to manage dialog open/close
     const [open, setOpen] = useState(false);
     const [categoryData, setCategoryData] = useState({ name: "", image: "" });
     const [isEdit, setIsEdit] = useState(false)
     const [selectedCategoryId, setSelectedCategoryId] = useState(null)

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const columns = [
        { Header: "name", accessor: "name", width: "45%", align: "left" },
        { Header: "image", accessor: "image", align: "left" },
        {
            Header: "edit", accessor: "edit", align: "center",
            /* eslint-disable react/prop-types */
            Cell: ({ row }) => (
                <MDButton variant="text" color="dark" onClick={() => handleEdit(row.original)}>
                    <Icon>edit</Icon>
                </MDButton>
            ),
        },
        {
            Header: "delete", accessor: "delete", align: "center",
            /* eslint-disable react/prop-types */
            Cell: ({ row }) => (
                <MDButton variant="text" color="error">
                    <Icon>delete</Icon>
                </MDButton>
            ),
        }
    ]

    const rows = categories.map((category) => ({
        id: category.id,
        name: category.name,
        image: category.image,
    }));

    const toggleDialog = () => {
        setOpen(!open);
        if(!open){
            setCategoryData({name: "",image: ""})
            setIsEdit(false)
            setSelectedCategoryId(null)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleFormSubmit = () => {
        if(isEdit){
            dispatch(editCategory({id: selectedCategoryId, modifiedCategory: categoryData}))
        } else {
            dispatch(createCategory(categoryData));
        }
        toggleDialog()
    };

    const handleEdit = (category) => {
        setCategoryData({ name: category.name, image: category.image });
        setSelectedCategoryId(category.id);
        setIsEdit(true);
        setTimeout(() => toggleDialog(), 1); // Open dialog after state is updated
      };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDButton variant="gradient" color="secondary" onClick={toggleDialog} >Add Category</MDButton>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Category
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                {loading ? (
                                    <MDTypography variant="h6">Loading...</MDTypography>
                                ) : (
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
             {/* Add Category Dialog */}
             <Dialog open={open} onClose={toggleDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        value={categoryData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="image"
                        name="image"
                        label="Category image"
                        type="text"
                        fullWidth
                        value={categoryData.image}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <MDButton onClick={toggleDialog} color="secondary">
                        Cancel
                    </MDButton>
                    <MDButton onClick={handleFormSubmit} color="info">
                        {isEdit ? "Save Changes" : "Add"}
                    </MDButton>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}

export default Categories;
