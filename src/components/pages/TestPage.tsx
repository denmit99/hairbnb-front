import { Autocomplete, TextField } from "@mui/material";
import axiosInstance from "../../api/axios";
import axios from "axios";
import { SyntheticEvent, useState } from "react";

export default function TestPage() {
  const [results, setResults] = useState<string[]>([]);
  const URI = "https://api.geoapify.com/v1/geocode/autocomplete";
  const onInputChange = async (_: SyntheticEvent, value: string) => {
    try {
      var resp = await axios.get(URI, {
        params: {
          text: value,
          apiKey: "5949db799da544f995868031e37ad779",
          limit: 5, // Limit the number of results returned
        },
      });
      var mapped = resp.data.features.map((f: any) => f.properties.formatted);
      setResults(mapped);
      console.log(resp);
      console.log(mapped);
    } catch (error) {
      console.log("error");
    }
    console.log("haha");
  };

  return (
    <Autocomplete
      freeSolo
      disablePortal
      options={results}
      sx={{ width: 300 }}
      onInputChange={onInputChange}
      // onChange={} //handles option selection
      filterOptions={(x) => x}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
