import React, {useContext, useState, useEffect} from "react";
import { ApiContext } from "../context/ApiContext";
import LazyLoad from 'react-lazyload';
import {ChildComponent} from '../components/ChildComponent';
import Spinner from "../components/common/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
    const apiContext = useContext(ApiContext);
    const [childrenData, setChildrenData] = useState();
  
    useEffect(() => {
      const getChildrenData = async () => {
        try {
          const { data } = await apiContext.auth.authAxios.get(  
           'daycare/tablet/group?accessToken=' + apiContext.auth.authToken + 
           '&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673'
          );
          setChildrenData(data.children);
        } catch (error) {
          toast.error(<div>There was an error loading your data <br />{error.message}</div>, { autoClose: false });
        }
      };
      getChildrenData();
    }, [apiContext]);

    const handleChildCheckIn = React.useCallback((child) => {
      const dataStringCheckIn = 'accessToken=' + apiContext.auth.authToken + '&pickupTime=16:00';
      apiContext.auth.authAxios.post('v2/children/' + child.childId + '/checkins', dataStringCheckIn)
      .then(function(response){
        setChildrenData((data) => {
          let newChildData = data.map(ch=>
              ch.childId === child.childId ? {...ch, checkedIn: true, pickupTime: response.data.pickupTime}: {...ch})
              return newChildData;
          });
        })
      .catch(function (error) {
        toast.error(<div>There was an error while checking in {child.name.fullName}<br />{error.response.data.error}</div>, { autoClose: false });
      })
    }, [apiContext]);

    const handleChildCheckOut = React.useCallback((child) => {
      const dataStringCheckOut = 'accessToken=' + apiContext.auth.authToken;
      apiContext.auth.authAxios.post('v2/children/' + child.childId + '/checkout', dataStringCheckOut)
      .then(function(response){
        setChildrenData((data) => {
          let newChildData = data.map(ch=>
            ch.childId === child.childId ? {...ch, checkedIn: false, pickupTime: response.data[0].pickupTime}: {...ch})
            return newChildData;
          });
        })
      .catch(function (error) {
        toast.error(<div>There was an error while checking out {child.name.fullName}<br />{error.response.data.error}</div>, { autoClose: false });
     })
    }, [apiContext]);
  
    return (
      <>
        {childrenData ? (
          <>
              <div className="child-list">
                {childrenData.map(child => {
                  return(
                        <LazyLoad height={200} offset={100} key={child.childId}>
                          <ChildComponent 
                            child={child} 
                            onCheckIn = {handleChildCheckIn}
                            onCheckOut = {handleChildCheckOut}/>
                        </LazyLoad>)})}
              </div>
          </>
        ) : (
            <Spinner />
        )}
      </>
    );
  };
  
  export default HomePage;