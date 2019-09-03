import { Button, Result } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import BlankLayout from "../../layouts/BlankLayout/BlankLayout";
import React from "react";

const PageNotFound: FC = () => (
    <BlankLayout title="Strona nie istnieje">
        <Result
            status="404"
            title="404"
            subTitle="Strona nie istnieje"
            extra={
                <Link to="/">
                    <Button type="primary" icon="left">
                        Powrót na stronę główną
                    </Button>
                </Link>
            }
        />
    </BlankLayout>
);

export default PageNotFound;
