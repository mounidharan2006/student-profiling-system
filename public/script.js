async function saveStudent() {

    const semesterPerformance = [];

    for (let i = 1; i <= 4; i++) {

        const semester =
            document.getElementById(`sem${i}`).value;

        const sgpa =
            document.getElementById(`sgpa${i}`).value;

        if (semester && sgpa) {

            semesterPerformance.push({
                semester: Number(semester),
                sgpa: Number(sgpa)
            });

        }
    }


    const arrears = [];

    const arrearSubject =
        document.getElementById("arrearSubject").value;

    const arrearSemester =
        document.getElementById("arrearSemester").value;

    const arrearStatus =
        document.getElementById("arrearStatus").value;


    if (arrearSubject && arrearSemester) {

        arrears.push({
            subject: arrearSubject,
            semester: Number(arrearSemester),
            status: arrearStatus
        });

    }


    const skillsText =
        document.getElementById("technicalSkills").value;


    const technicalSkills =
        skillsText
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");


    const student = {

        name:
            document.getElementById("name").value,

        registerNumber:
            document.getElementById("registerNumber").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        dateOfBirth:
            document.getElementById("dateOfBirth").value,

        gender:
            document.getElementById("gender").value,

        address:
            document.getElementById("address").value,

        fatherName:
            document.getElementById("fatherName").value,

        motherName:
            document.getElementById("motherName").value,

        familyIncome:
            Number(
                document.getElementById("familyIncome").value
            ) || 0,

        fatherOccupation:
            document.getElementById("fatherOccupation").value,

        motherOccupation:
            document.getElementById("motherOccupation").value,

        semester:
            Number(
                document.getElementById("semester").value
            ) || 0,

        cgpa:
            Number(
                document.getElementById("cgpa").value
            ) || 0,

        semesterPerformance:
            semesterPerformance,

        arrears:
            arrears,

        technicalSkills:
            technicalSkills,

        strengths:
            document.getElementById("strengths").value,

        weaknesses:
            document.getElementById("weaknesses").value,

        careerGoal:
            document.getElementById("careerGoal").value,

        careerPath:
            document.getElementById("careerPath").value
    };


    if (
        !student.name ||
        !student.registerNumber ||
        !student.email
    ) {

        alert(
            "Please enter Name, Register Number and Email."
        );

        return;
    }


    try {

        const response = await fetch(
            "/api/students",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            }
        );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Student profile saved successfully!"
            );

            clearForm();

            loadStudents();

        } else {

            alert(
                data.error ||
                data.message ||
                "Error saving student"
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to server."
        );
    }
}



async function loadStudents() {

    const studentList =
        document.getElementById("studentList");


    if (!studentList) {
        return;
    }


    try {

        const response =
            await fetch("/api/students");


        const students =
            await response.json();


        if (!Array.isArray(students)) {

            studentList.innerHTML =
                "<p>Error loading students.</p>";

            return;
        }


        if (students.length === 0) {

            studentList.innerHTML = `
                <p class="text-muted">
                    No student profiles found.
                </p>
            `;

            return;
        }


        studentList.innerHTML = "";


        students.forEach(student => {

            const card =
                document.createElement("div");


            card.className =
                "student-card card p-3 mb-3";


            const skills =
                student.technicalSkills
                    ? student.technicalSkills.join(", ")
                    : "None";


            const arrearCount =
                student.arrears
                    ? student.arrears.length
                    : 0;


            card.innerHTML = `

                <h4>
                    ${student.name}
                </h4>

                <p>
                    <strong>Register Number:</strong>
                    ${student.registerNumber}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${student.email}
                </p>

                <p>
                    <strong>Semester:</strong>
                    ${student.semester || "Not provided"}
                </p>

                <p>
                    <strong>CGPA:</strong>
                    ${student.cgpa || "Not provided"}
                </p>

                <p>
                    <strong>Technical Skills:</strong>
                    ${skills}
                </p>

                <p>
                    <strong>Arrears:</strong>
                    ${arrearCount}
                </p>

                <p>
                    <strong>Career Path:</strong>
                    ${student.careerPath || "Not provided"}
                </p>

                <p>
                    <strong>Career Goal:</strong>
                    ${student.careerGoal || "Not provided"}
                </p>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteStudent('${student._id}')"
                >
                    Delete
                </button>

            `;


            studentList.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        studentList.innerHTML = `
            <p class="text-danger">
                Error connecting to server.
            </p>
        `;
    }
}



async function deleteStudent(id) {

    if (
        !confirm(
            "Are you sure you want to delete this student?"
        )
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/students/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Student deleted successfully."
            );

            loadStudents();

        } else {

            alert(
                data.message ||
                "Unable to delete student."
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Server connection error."
        );
    }
}



function clearForm() {

    const ids = [

        "name",
        "registerNumber",
        "email",
        "phone",
        "dateOfBirth",
        "gender",
        "address",
        "fatherName",
        "motherName",
        "familyIncome",
        "fatherOccupation",
        "motherOccupation",
        "semester",
        "cgpa",
        "arrearSubject",
        "arrearSemester",
        "technicalSkills",
        "strengths",
        "weaknesses",
        "careerGoal",
        "sem1",
        "sgpa1",
        "sem2",
        "sgpa2",
        "sem3",
        "sgpa3",
        "sem4",
        "sgpa4"

    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });


    document.getElementById("careerPath").value =
        "Placement";


    document.getElementById("arrearStatus").value =
        "Cleared";
}



document.addEventListener(
    "DOMContentLoaded",
    () => {
        loadStudents();
    }
);