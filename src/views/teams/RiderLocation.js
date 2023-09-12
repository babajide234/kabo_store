
import { CircularProgress, Box } from '@mui/material';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService,InfoWindow   } from '@react-google-maps/api';
import { useTeamSlice } from 'src/@core/store/teamStore';

const RiderLocation = () => {

    const location = useTeamSlice((state) => state.location)
    
    console.log({
        lat: parseFloat(location?.location.latitude), lng: parseFloat(location?.location.longitude)
    });

    const center = {
        lat: location ? parseFloat(location?.location.latitude) : 0,
        lng: location ? parseFloat(location?.location.longitude) : 0
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBP36yIMHK0Fk1EFDoRNt_nLqadIm5wlMc"
    })
    

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
      
    const options = {
        disableDefaultUI: true,
    };

    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 10,
        fontSize:"15px"
      }

    return (
        <>
        {
            isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                    options={options}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <>
                    <Marker
                        position={center}
                    />
                        <InfoWindow
                            position={center}
                            zIndex={1}
                        >
                            <div style={divStyle}>
                                <h1>{location?.location.address }</h1>
                            </div>
                        </InfoWindow>
                    </>
                    
                </GoogleMap>
            ) : (
                <Box sx={{
                    width:'100%',
                    height:'100%'
                }}>
                    <CircularProgress/>
                </Box>
            )
        }
                
    </>
    );
}

export default RiderLocation;