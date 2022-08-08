import { useEffect, useState } from 'react';

import API from '../config';
import { getToken } from '../utils';

const useWishList = () => {
  const [wishList, setWishList] = useState([]);

  const getWishListData = () => {
    fetch(`${API.carts}`, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then(res => res.json())
      .then(data => {
        setWishList(data && data.results.map(data => data.lecture_id));
      });
  };

  useEffect(() => {
    getToken() && getWishListData();
  }, []);

  return wishList.length > 0 ? wishList : [];
};

export default useWishList;
