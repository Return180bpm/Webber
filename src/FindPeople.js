import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "./axios";

import { TextField, Button, Avatar, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

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

        if (searchQuery === "") {
            const LIMIT = 3;

            (async () => {
                const { data } = await axios.get(
                    `/api/getNewestUsers?limit=${LIMIT}`
                );

                if (!abort) {
                    setUsers(data);
                }
            })();
        } else {
            (async () => {
                const { data } = await axios.get(
                    `/api/findUsers?q=${searchQuery}`
                );

                if (!abort) {
                    setUsers(data);
                }
            })();
        }

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
                {/* {searchQuery && users.length === 0 && (
                    <Typography>No users found!</Typography>
                )}
                <Typography> */}
                {!searchQuery
                    ? "Our newest users"
                    : users.length === 0
                    ? "No users found!"
                    : "Search results"}
                {/* </Typography> */}
                <ul>
                    {users &&
                        users.map((user) => {
                            return (
                                <li>
                                    <Link
                                        to={"/user/" + user.id}
                                        component={RouterLink}
                                    >
                                        <Avatar
                                            key={user.id}
                                            src={user.profile_pic_url}
                                        ></Avatar>
                                        {user.firstname} {user.lastname}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </Paper>
        </>
    );
};
export default FindPeople;
