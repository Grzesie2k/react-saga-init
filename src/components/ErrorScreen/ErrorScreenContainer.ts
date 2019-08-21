import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { StoreState } from "../../store/StoreState";
import ErrorScreen, { ErrorScreenDetectorDispatchProps, ErrorScreenStateProps } from "./ErrorScreen";
import { hideErrorScreen, showErrorScreen } from "./store/errorScreenActions";

type OwnProps = {};

const mapStateToProps: MapStateToProps<ErrorScreenStateProps, OwnProps, StoreState> = (state) => ({
    error: state.errorScreen,
});

const mapDispatchToProps: MapDispatchToProps<ErrorScreenDetectorDispatchProps, OwnProps> = (dispatch) => ({
    showError(type) {
        dispatch(showErrorScreen(type));
    },
    hideError() {
        dispatch(hideErrorScreen());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorScreen);
