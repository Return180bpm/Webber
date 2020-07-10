import React, { useEffect, useState } from "react";
import axios from "./axios";

import { TextField, Button, Avatar } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import { profileStyles } from "./styles";

const useStyles = makeStyles(profileStyles);

const FindPeople = () => {
    const classes = useStyles();

    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    useEffect(() => {});

    useEffect(() => {
        let abort;

        (async () => {
            const { data } = await axios.get(`/api/findUsers?q=${searchQuery}`);
            console.log("changing", data);

            if (!abort) {
                setUsers(data);
            }
        })();
        return () => {
            abort = true;
        };
    }, [searchQuery]);

    return (
        <>
            <Paper className={classes.paper}>
                <TextField
                    name="searchQuery"
                    id="searchQuery"
                    label="Search"
                    autoComplete="false"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSearchQuery(e.target.value)}
                ></TextField>
                <ul>
                    {users &&
                        users.map((user) => {
                            return (
                                <li>
                                    <Avatar
                                        key={user.id}
                                        src={user.profile_pic_url}
                                    ></Avatar>
                                    {user.firstname} {user.lastname}
                                </li>
                            );
                        })}
                </ul>
            </Paper>
        </>
    );
};
export default FindPeople;
