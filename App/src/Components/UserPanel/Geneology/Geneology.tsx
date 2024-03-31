import * as React from 'react'
//@ts-ignore
import OrganizationChart from "@dabeng/react-orgchart";
import MyNode from "./my-node";

//@ts-ignore
export default function Geneology({enableZoom = false, dataSource }): any {

    return (

        <OrganizationChart
            datasource={dataSource}
            chartClass="myChart"
            NodeTemplate={MyNode}
            pan={true}
            zoom={enableZoom}
            exportButton={true}
            exportFilename={'MyBrokerChart'}
            sx={{ backgroundColour: 'initial' }}
        />

    )
}
