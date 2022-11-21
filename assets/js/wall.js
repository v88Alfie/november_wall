var currentPostId;
var currentCommentId;

document.addEventListener("DOMContentLoaded", function(){
    let create_post_form = document.querySelector("#create_post_form");
    let topic_lists = document.querySelector("#topic_lists");

    create_post_form.addEventListener("submit", postMessage);
    topic_lists.addEventListener("click", editPost);
    topic_lists.addEventListener("click", showDeleteConfirmText);
    topic_lists.addEventListener("click", deletePost);
    topic_lists.addEventListener("click", addComment);
    topic_lists.addEventListener("click", editComment);
    topic_lists.addEventListener("click", saveEditComment);
    topic_lists.addEventListener("click", showDeleteCommentConfirm);
    topic_lists.addEventListener("click", deleteComment);
});

/**
 * DOCU: This function will submit create_post_form <br>
 * Triggerd By: create_post_form.addEventListener("submit", postMessage); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const postMessage = (event) => {
    event.preventDefault();

    let topic_content = document.querySelector("#topic_content");

    if(!(topic_content.value.trim().length)){
        document.querySelector("#topic_form_container").classList.add("input_error");
    }
    else if(currentPostId){
        let topic_container = document.querySelector(`[data-post-id="${currentPostId}"]`);

        topic_container.querySelector(".post_text").innerHTML = topic_content.value;
    }
    else{
        let topic_lists = document.getElementById("topic_lists");
        let topic_container = document.querySelector("#clone_topic_container .topic_post").cloneNode(true);

        topic_container.setAttribute("class", "topic_container");
        topic_container.querySelector(".post_text").innerHTML = topic_content.value;
        topic_container.setAttribute("data-post-id", generateId("topic_container"));

        topic_lists.append(topic_container);
        document.querySelector("#blank_topic_container").classList.add("hidden");
    };

    topic_content.value = "";
    currentPostId = "";
};

/**
 * DOCU: This function will edit the selected post <br>
 * Triggerd By: topic_lists.addEventListener("click", editPost); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const editPost = (event) => {
    event.preventDefault();

    let topic_container = event.target.closest(".topic_container");
    let topic_content = document.querySelector("#topic_content");

    if(event.target.classList.contains("edit_btn")){
        topic_content.value = topic_container.querySelector(".post_text").innerHTML;
        currentPostId = topic_container.dataset.postId;
    };
};

/**
 * DOCU: This function will show delete confirmation text <br>
 * Triggerd By: topic_lists.addEventListener("click", showDeleteConfirmText); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const showDeleteConfirmText = (event) => {
    event.preventDefault();

    let topic_container = event.target.closest(".topic_container");

    if(event.target.classList.contains("delete_btn")){
        topic_container.querySelector(".confirm_text").classList.remove("hidden");
    }
};

/**
 * DOCU: This function will show delete confirmation text <br>
 * Triggerd By: topic_lists.addEventListener("click", showDeleteConfirmText); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const deletePost = (event) => {
    event.preventDefault();

    let topic_container = event.target.closest(".topic_container");

    if(event.target.classList.contains("no_btn")){
        topic_container.querySelector(".confirm_text").classList.add("hidden");
    }
    else if(event.target.classList.contains("yes_btn")){
        topic_container.remove();
    }
};

/**
 * DOCU: This function will add comment on a post <br>
 * Triggerd By: topic_lists.addEventListener("click", addComment); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const addComment = (event) => {
    event.preventDefault();

    let comment_form = event.target.closest(".topic_container .comment_form");
    let comment_container = event.target.closest(".topic_container .comment_form_container");
    let post_topic_id = event.target.closest(".topic_container").dataset.postId;


    if(event.target.classList.contains("submit_comment_btn")){
        let comment = comment_form.querySelector(".comment");

        if(!(comment.value.trim().length)){
            comment_form.closest(".comment_form_container").classList.add("input_error");
        }
        else{
            let comments_container = document.querySelector("#clone_topic_container .comment_content").cloneNode(true);
            let responses = document.querySelectorAll(`[data-post-id="${post_topic_id}"] .comment_content`).length + 1;

            comments_container.setAttribute("class", "comment_content");
            comments_container.querySelector(".comment_text").innerHTML = comment.value;
            comments_container.setAttribute("data-comment-id", `${post_topic_id}-${generateId("comments_container")}`);
            comment_container.insertAdjacentElement('afterend', comments_container);

            comment.value = "";
            getNumberOfResponses(post_topic_id, responses);
        }
    }
};

/**
 * DOCU: This function will edit a comment <br>
 * Triggerd By: topic_lists.addEventListener("click", editComment); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const editComment = (event) => {
    event.preventDefault();

    let comment_content = event.target.closest(".comment_content");

    if(event.target.classList.contains("edit_comment_btn")){
       // let edit_comment_form = comment_content.querySelector(".comment_form");
        let comment_text = comment_content.querySelector(".comment_text").innerHTML;

        comment_content.querySelector(".edit_comment_form_container").classList.remove("hidden");
        comment_content.querySelector(".details_container").classList.add("hidden");
        comment_content.querySelector(".comment_text").classList.add("hidden");

        let edit_comment = comment_content.querySelector(".comment_form .edit_comment");
        edit_comment.value = comment_text;
        currentCommentId = comment_content.dataset.commentId;
    }
};

/**
 * DOCU: This function will update the comment <br>
 * Triggerd By: topic_lists.addEventListener("click", saveEditComment); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const saveEditComment = (event) => {
    event.preventDefault();

    if(event.target.classList.contains("save_comment_btn")){
        let current_comment = document.querySelector(`[data-comment-id="${currentCommentId}"]`);
        let edit_comment = current_comment.querySelector(".edit_comment");

        current_comment.querySelector(".comment_text").innerHTML = edit_comment.value;
        current_comment.querySelector(".edit_comment_form_container").classList.add("hidden");
        current_comment.querySelector(".details_container").classList.remove("hidden");
        current_comment.querySelector(".comment_text").classList.remove("hidden");
    }
};

/**
 * DOCU: This function will show the delete confirmation text <br>
 * Triggerd By: topic_lists.addEventListener("click", showDeleteCommentConfirm); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const showDeleteCommentConfirm = (event) => {
    event.preventDefault();

    let closest_action_group = event.target.closest(".action_group");

    if(event.target.classList.contains("delete_comment_btn")){
        closest_action_group.querySelector(".confirm_text").classList.remove("hidden");
    };
};

/**
 * DOCU: This function will delete the comment <br>
 * Triggerd By: topic_lists.addEventListener("click", deleteComment); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const deleteComment = (event) => {
    event.preventDefault();

    let closest_comment_content = event.target.closest(".comment_content");
    let topic_container = event.target.closest(".topic_container");
    let postId = topic_container.dataset.postId;
    let comment_count = document.querySelectorAll(`[data-post-id="${postId}"] .comment_content`).length - 1;

    if(event.target.classList.contains("no_comment_btn")){
        closest_comment_content.querySelector(".confirm_text").classList.add("hidden");
    }
    else if(event.target.classList.contains("yes_comment_btn")){
        closest_comment_content.remove();
        getNumberOfResponses(postId, comment_count);
    };
};

/**
 * DOCU: This function will update the number of responses in each post <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const getNumberOfResponses = (post_id, number_of_responses) => {
    let post_topic = document.querySelector(`[data-post-id="${post_id}"]`);
    post_topic.querySelector(".responses").innerHTML = `${number_of_responses} Responses`;
};

/**
 * DOCU: This function generate an id based on the number of elements <br>
 * @param {*} container container elements
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const generateId = (container) => {
   return document.querySelectorAll(`.${container}`).length;
};