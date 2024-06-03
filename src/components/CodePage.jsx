import React, { useEffect, useState } from 'react'
import PostList from './PostList';
import { Box, Heading } from '@chakra-ui/layout';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const Combobox = ({setFeedValue}) => {
    const options = [
        "python", "java", "javascript", "c", "cpp", "csharp", "ruby", "php", "swift", "go",
        "typescript", "kotlin", "rust", "r", "dart", "objectivec", "scala", "perl", "html", "css",
        "sql", "bash", "shell", "powershell", "xml", "json", "yaml", "markdown", "ini", "make",
        "matlab", "vba", "lua", "groovy", "haskell", "clojure", "erlang", "elixir", "fsharp", "lisp",
        "scheme", "fortran", "ada", "pascal", "delphi", "abap", "sas", "stata", "julia", "prolog"
    ];

    const [value, setValue] = useState([]);

    const theme = createTheme();

    useEffect(() => {
        if (value.length === 0) {
            setFeedValue('');
            return;
        }
        setFeedValue(value.concat().join(','));
    }, [value]);

    return (

        <ThemeProvider theme={theme}>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                }}
                multiple
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option}
                // defaultValue={[top100Films[13]]}
                filterSelectedOptions
                sx={{
                    width: [0.88, 0.9, 0.8], // Responsive width based on array values
                    maxWidth: 550, // Maximum width
                    marginTop: 2, // Margin
                    marginBottom: 5, // Bottom margin
                    marginLeft: 1,
                }}
                renderInput={(params) => <TextField {...params} label="Coding Languages" />}
            />
        </ThemeProvider>
    );
};



function CodePage() {
    const [feedValue, setFeedValue] = useState('');
    console.log(feedValue);
    return (
        <Box width="100%" maxWidth="960px" >
            <Heading m={2}>What's Coding?</Heading>
            <Combobox setFeedValue={setFeedValue} />
            <PostList feedType='CODE' feedValue={feedValue} offset={0} limit={5} />
        </Box>
    );
}

export default CodePage