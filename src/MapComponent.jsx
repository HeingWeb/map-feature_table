import "@arcgis/map-components/components/arcgis-map"; // Example: for the map component
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-table-list";
import Layer from '@arcgis/core/layers/Layer'
import PortalItem from '@arcgis/core/portal/PortalItem'
import { useRef, useEffect } from "react";   

function MapComponent() {
    const mapRef=useRef(null)
    const tableRef=useRef(null)
    const featureTableId="6aa49be79248400ebd28f1d0c6af3f9f"
    const addTable= async (id)=>{
    const table = await Layer.fromPortalItem({
        portalItem: new PortalItem({
          id
        })
      });
      // Wait for the table to load
      await table.load();

      // If the table is a table,
      // set the title and add it to the map and feature table
      if (table.isTable) {
        table.title = "Table from portal item";
        mapRef.current.addTable(table);
        tableRef.current.layer = table;
      }
    }
     useEffect(() => {
        if (mapRef.current) {
          // You can access the web component instance and its properties/methods here
          // For example, to set a web map ID:
          mapRef.current.itemId = "62f9d6aabd024931a940c5f00d74d0ac";
          mapRef.current.addEventListener(
            "arcgisViewReadyChange",
            () => {
              addTable("6aa49be79248400ebd28f1d0c6af3f9f");
            },
            { once: true }
          );
          // Or to listen to events:
          // mapRef.current.addEventListener('viewReady', () => console.log('Map view ready!'));
        }
      }, []);
  return (
     <calcite-shell>
      <arcgis-map ref={mapRef}>
        <arcgis-legend position="bottom-left"></arcgis-legend>
        <arcgis-table-list position="top-right" selection-mode="single" show-heading></arcgis-table-list>
     </arcgis-map>
     <arcgis-feature-table ref={tableRef}></arcgis-feature-table>
     </calcite-shell>
    
  )
}

export default MapComponent