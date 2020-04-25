import React from "react";

import { connect } from "react-redux";

import { LibraryActions, ViewActions } from "Actions";

import { SearchBar } from "Components";

const mapStateToProps = (state, ownProps) => ({});
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    onInput: input => { dispatch(LibraryActions.setFilter(input.toLowerCase())) },
    onMenuClick: () => { dispatch(ViewActions.toggleMenuDrawer()) }
});

const AlbumSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default React.forwardRef((props, ref) => {
    return (
        <div className={props.className} ref={ref}>
            <AlbumSearchBar/>
        </div>
    );
});
