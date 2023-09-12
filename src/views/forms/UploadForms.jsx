import { useEffect, useState } from "react";
import { 
    Grid, 
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CardContent,
    Button, 
} from "@mui/material";

import { useTeamSlice } from "src/@core/store/teamStore";
import { useUserStore } from "src/@core/store/userStore";
import FileUploader from "src/@core/components/FileUploader";
import { uploadStore } from "src/@core/store/uploadSlice";
import SelectInput from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";



const UploadForms = () => {
    const token = useUserStore( (state) => state.user )
    const loading = useTeamSlice( (state) => state.loading )
    const userId = useTeamSlice( (state) => state.userId )
    const uploadId = useTeamSlice( (state) => state.uploadId )
    const uploadNokId = useTeamSlice( (state) => state.uploadNokId )
    const file_url = uploadStore( (state) => state.file_url )
    const details = useUserStore( (state) => state.details )

    const [type, setType] = useState('')


    const handleSubmit = (values) => {

         if(type == "user"){
            uploadId({
                token,
                management: "Yes",
                store_id: details.store_id.admin ? details.store_id.admin : '',
                account_id: userId,
                file_url: file_url
            })
         }
         if(type == "nok"){
            uploadNokId({
                token,
                management: "Yes",
                store_id: details.store_id.admin ? details.store_id.admin : '',
                account_id: userId,
                file_url: file_url
            })
         }
    };

    return (
        <CardContent>
            <Grid container xs={8} spacing={7}>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <InputLabel>Upload Type</InputLabel>
                        <SelectInput
                            name="type"
                            as={Select}
                            label="Upload Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="user">User license</MenuItem>
                            <MenuItem value="nok">Next of Kin license</MenuItem>
                        </SelectInput>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FileUploader/>
                </Grid>
                <Grid item xs={8}>
                    <LoadingButton
                        loading={loading}
                        color="primary"
                        variant="contained"
                        component="span"
                        disabled={ file_url ? false : true}
                        onClick={handleSubmit}
                    >
                        Upload
                    </LoadingButton>
                </Grid>
            </Grid>
        </CardContent>
    );
}

export default UploadForms;