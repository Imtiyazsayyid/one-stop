"use client";
import React, { useEffect } from "react";

interface Props {
  selectedDays: string[];
  timeTableRows: any[];
}

const TimeTableReport = ({ selectedDays, timeTableRows }: Props) => {
  function printData() {
    var divToPrint = document.getElementById("printable");
    let newWin = window.open("");
    newWin?.document.write(divToPrint?.outerHTML || "");
    newWin?.document.close();
    newWin?.print();
    //newWin.close();
  }

  useEffect(() => {
    // printData();
  }, []);

  return (
    <div className="w-full h-full border p-10">
      <table id="printable" cellSpacing={0} style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Timing</th>
            {selectedDays.map((day) => (
              <th key={day} style={styles.th}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>10:00-11:00</td>
            <td style={styles.td}>CJ</td>
            <td style={styles.td}>CJ</td>
            <td style={styles.td}>CJ</td>
          </tr>
        </tbody>
      </table>
      <button onClick={printData}>Print</button>
    </div>
  );
};

const styles = {
  table: {
    border: "1px solid black",
    fontFamily: "Arial",
    width: "100%",
  },
  th: {
    border: "1px solid black",
    padding: "1rem",
  },
  td: {
    border: "1px solid black",
    padding: "1rem",
  },
};

export default TimeTableReport;
