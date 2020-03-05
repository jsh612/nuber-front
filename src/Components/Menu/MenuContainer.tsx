import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile, toggleDrivingMode } from "../../types/api";
import TOGGL_DRIVING from "./Menu.queries";

const MenuContainer: React.FC = () => {
  const { data, loading } = useQuery<userProfile>(USER_PROFILE);
  const [toggleDrivingMutation] = useMutation<toggleDrivingMode>(
    TOGGL_DRIVING
    // - 강의에서는 cache값 변경을 통해 MenuPresenter에 운전여부 버튼을 변경시켰다.
    //   하지만 나는 useState 사용을 통해 re-render 되도록하였다.
    // - 강의의 원리
    //   기본적으로, 운전여부의 상태 변경시 re-render가 목적이다.
    //   이를 위해 mutation으로 백엔드에서 data 받은 후, cache를 수동을 변경 시켜 버리는 것이다.
    //   (The React should automatically rerender the component that requests data
    //   from the local cache when updating this data from another component)
    // {
    //   update: (cache, { data }) => {
    //     if (data) {
    //       const { ToggleDrivingMode } = data;
    //       if (!ToggleDrivingMode.ok) {
    //         toast.error(ToggleDrivingMode.error);
    //         return;
    //       }
    //       const query: userProfile | null = cache.readQuery({
    //         query: USER_PROFILE
    //       });
    //       if (query) {
    //         const {
    //           GetMyProfile: { user }
    //         } = query;
    //         if (user) {
    //           user.isDriving = !user.isDriving;
    //         }
    //       }
    //       cache.writeQuery({ query: USER_PROFILE, data: query });
    //     }
    //   }
    // }
  );
  return (
    <MenuPresenter
      data={data}
      loading={loading}
      toggleDrivingFn={toggleDrivingMutation}
    />
  );
};

export default MenuContainer;
