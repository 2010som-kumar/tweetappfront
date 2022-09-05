import React from "react";

export default function Tag(props) {
  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        {props.tagFlag ? (
          ""
        ) : (
          <textarea
            style={{ resize: "none" }}
            type="text"
            defaultValue={props.value}
            onChange={props.onChangeTweet}
            name="tag"
            maxLength={50}
            placeholder="Add Tag"
            rows="1"
            cols="58"
          />
        )}
        <button
          type="button"
          className="btn btn-sm btn-info"
          onClick={props.onChangeTag}
          placeholder="Tag Here"
          style={!props.tagFlag ? { marginLeft: "1%" } : { marginLeft: "42%" }}
        >
          Tag
        </button>
      </div>
    </>
  );
}
