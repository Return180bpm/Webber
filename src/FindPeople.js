import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "./axios";

import {
    TextField,
    Button,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Divider,
    ListItemText,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";
import { findPeopleStyles } from "./styles";

const useStyles = makeStyles(findPeopleStyles);

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
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <TextField
                        name="searchQuery"
                        id="searchQuery"
                        label="Search"
                        autoComplete="false"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: 8 }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    ></TextField>

                    <Typography variant="h5">
                        {!searchQuery
                            ? "Our Freshest Faces"
                            : users.length === 0
                            ? "No users found!"
                            : "Search results"}
                    </Typography>
                    <List style={{ width: "100%" }}>
                        {users &&
                            users.map((user, ind) => {
                                return (
                                    <React.Fragment key={user.id}>
                                        <ListItem
                                            alignItems="flex-start"
                                            // style={{ height: "150px" }}
                                        >
                                            <Link
                                                to={"/user/" + user.id}
                                                component={RouterLink}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        style={{
                                                            height: 80,
                                                            width: 80,
                                                        }}
                                                        src={
                                                            user.profile_pic_url
                                                        }
                                                    ></Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        user.firstname +
                                                        " " +
                                                        user.lastname
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary"
                                                                style={{
                                                                    display:
                                                                        "inline",
                                                                }}
                                                            >
                                                                {user.bio}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </Link>
                                        </ListItem>
                                        {ind < users.length - 1 && (
                                            <Divider
                                                variant="inset"
                                                component="li"
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                    </List>
                </Paper>
            </main>
        </>
    );
};
export default FindPeople;
