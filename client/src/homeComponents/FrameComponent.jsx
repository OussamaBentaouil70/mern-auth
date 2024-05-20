import {
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import "./FrameComponent.css";

const FrameComponent = () => {
  return (
    <section className="frame-wrapper10">
      <div className="f-a-q-content-parent">
        <div className="f-a-q-content">
          <div className="f-a-q-heading">
            <div className="f-a-q-titles">
              <h1 className="frequentlly-asked-questions">
                Frequentlly asked questions
              </h1>
              <div className="we-put-together-container">
                <p className="we-put-together">{`we put together some frequently asked `}</p>
                <p className="questions-dont">
                  questions dont hesitate to contact us .
                </p>
              </div>
            </div>
            <Button
              className="f-a-q-heading-child"
              disableElevation={true}
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "20",
                background: "#0079ff",
                borderRadius: "30px",
                "&:hover": { background: "#0079ff" },
                width: 229,
                height: 61,
              }}
            >
              Contact us
            </Button>
          </div>
        </div>
        <div className="unchanged-f-a-q">
          <FormControl
            className="parent"
            variant="standard"
            sx={{
              borderColor: "#dcdcdc",
              borderStyle: "SOLID",
              borderTopWidth: "1px",
              borderRightWidth: "1px",
              borderBottomWidth: "1px",
              borderLeftWidth: "1px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "100%",
              height: "119px",
              m: 0,
              p: 0,
              "& .MuiInputBase-root": {
                m: 0,
                p: 0,
                minHeight: "119px",
                justifyContent: "center",
                display: "inline-flex",
              },
              "& .MuiInputLabel-root": {
                m: 0,
                p: 0,
                minHeight: "119px",
                display: "inline-flex",
              },
              "& .MuiMenuItem-root": {
                m: 0,
                p: 0,
                height: "119px",
                display: "inline-flex",
              },
              "& .MuiSelect-select": {
                m: 0,
                p: 0,
                height: "119px",
                alignItems: "center",
                display: "inline-flex",
              },
              "& .MuiInput-input": { m: 0, p: 0 },
              "& .MuiInputBase-input": {
                color: "#000",
                fontSize: 20,
                fontWeight: "Regular",
                fontFamily: "Poppins",
                textAlign: "left",
                p: "0 !important",
                marginLeft: "27px",
              },
            }}
          >
            <InputLabel color="secondary" />
            <Select
              color="secondary"
              disableUnderline
              displayEmpty
              IconComponent={() => (
                <img
                  width="20px"
                  height="20px"
                  src="/plus-1.png"
                  style={{ marginRight: "45px" }}
                />
              )}
            >
              <MenuItem>{`elecmaining essentially unchanged. It was recen 1 ? `}</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl
            className="group"
            variant="standard"
            sx={{
              borderColor: "#dcdcdc",
              borderStyle: "SOLID",
              borderTopWidth: "1px",
              borderRightWidth: "1px",
              borderBottomWidth: "1px",
              borderLeftWidth: "1px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "100%",
              height: "119px",
              m: 0,
              p: 0,
              "& .MuiInputBase-root": {
                m: 0,
                p: 0,
                minHeight: "119px",
                justifyContent: "center",
                display: "inline-flex",
              },
              "& .MuiInputLabel-root": {
                m: 0,
                p: 0,
                minHeight: "119px",
                display: "inline-flex",
              },
              "& .MuiMenuItem-root": {
                m: 0,
                p: 0,
                height: "119px",
                display: "inline-flex",
              },
              "& .MuiSelect-select": {
                m: 0,
                p: 0,
                height: "119px",
                alignItems: "center",
                display: "inline-flex",
              },
              "& .MuiInput-input": { m: 0, p: 0 },
              "& .MuiInputBase-input": {
                color: "#000",
                fontSize: 20,
                fontWeight: "Regular",
                fontFamily: "Poppins",
                textAlign: "left",
                p: "0 !important",
                marginLeft: "27px",
              },
            }}
          >
            <InputLabel color="secondary" />
            <Select
              color="secondary"
              disableUnderline
              displayEmpty
              IconComponent={() => (
                <img
                  width="20px"
                  height="20px"
                  src="/plus-1-1.png"
                  style={{ marginRight: "45px" }}
                />
              )}
            >
              <MenuItem>{`elecmaining essentially unchanged. It was recen 1 ? `}</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <FormControl
            className="container"
            variant="standard"
            sx={{
              borderColor: "#dcdcdc",
              borderStyle: "SOLID",
              borderTopWidth: "1px",
              borderRightWidth: "1px",
              borderBottomWidth: "1px",
              borderLeftWidth: "1px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              width: "100%",
              height: "119px",
              m: 0,
              p: 0,
              "& .MuiInputBase-root": {
                m: 0,
                p: 0,
                minHeight: "119px",
                justifyContent: "center",
                display: "inline-flex",
              },
              "& .MuiInputLabel-root": {
                m: 0,
                p: 0,
                minHeight: "119px",
                display: "inline-flex",
              },
              "& .MuiMenuItem-root": {
                m: 0,
                p: 0,
                height: "119px",
                display: "inline-flex",
              },
              "& .MuiSelect-select": {
                m: 0,
                p: 0,
                height: "119px",
                alignItems: "center",
                display: "inline-flex",
              },
              "& .MuiInput-input": { m: 0, p: 0 },
              "& .MuiInputBase-input": {
                color: "#000",
                fontSize: 20,
                fontWeight: "Regular",
                fontFamily: "Poppins",
                textAlign: "left",
                p: "0 !important",
                marginLeft: "27px",
              },
            }}
          >
            <InputLabel color="secondary" />
            <Select
              color="secondary"
              disableUnderline
              displayEmpty
              IconComponent={() => (
                <img
                  width="20px"
                  height="20px"
                  src="/plus-1-2.png"
                  style={{ marginRight: "45px" }}
                />
              )}
            >
              <MenuItem>{`elecmaining essentially unchanged. It was recen 1 ? `}</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
