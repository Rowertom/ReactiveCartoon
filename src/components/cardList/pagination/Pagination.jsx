import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import service from "../../services/Service"

const pageSize = 12;

export default function CardPagination({setData}) {

  const [pagination, setPagination] = useState({
      count: 0,
      from: 0,
      to: pageSize,
  });

  useEffect(() => {
    service.getData({from: pagination.from, to: pagination.to}).then(response => {
      setPagination({ ...pagination, count: response.count});
      
      setData(response.loadData);
    });
  },[pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({...pagination, from: from, to: to});
  }

  return (
    <Box justifyContent={'center'} alignItems='center' display={'flex'}
        sx={{margin: '20px 0px'}} 
    >

      <Pagination 
          color="primary"
          count={Math.ceil(pagination.count/pageSize)}
          onChange={handlePageChange}
      />
    </Box>
  );
};