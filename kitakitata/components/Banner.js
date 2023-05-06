import { AppContext } from "@/context/AppContext"
import {
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Box,
  Divider,
} from "@chakra-ui/react"
import { useContext } from "react"

export default function Banner() {
  const { openCreateEventPage } = useContext(AppContext)

  return (
    <>
      <Box
        bgGradient="linear-gradient(100deg, rgba(226,218,253,1) 0%, rgba(237,205,227,1) 99%)"
        pt="48px"
        pb={{ base: "88px", md: "18px" }}
      >
        <Flex
          justifyContent={{ base: "space-between", md: "flex-end" }}
          alignItems="center"
          px={{ base: "16px", md: "88px" }}
        >
          <Box
            position={{ base: "relative", md: "absolute" }}
            left={{ base: "0", md: "10%" }}
            right={{ base: "0", md: "auto" }}
            top={{ base: "0", md: "10%" }}
          >
            <Text fontSize="48px" fontWeight="300">
              Unleash Your Social Side
            </Text>
            <Heading fontSize="72px" fontStyle="italic" fontWeight="500">
              Bring People Together
            </Heading>

            <Text fontSize="24px" fontWeight="400" color="#344054">
              Stay Informed and Connected with Like-Minded Individuals.
            </Text>
            <Text fontSize="24px" fontWeight="400" color="#344054">
              Build Lasting Relationships and Connections in Your Community.
            </Text>
            <Button py="14px" px="16px" mt={8} onClick={openCreateEventPage}>
              Create Event
            </Button>
          </Box>
          <Box display={{ base: "none", md: "block" }}>
            <Illustration />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export const Illustration = (props) => {
  return (
    <Icon
      width="909"
      height="557"
      viewBox="0 0 909 557"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M884 11V1H890.5V12L900 4.5L905 10.5L896.5 17.5H908V25.5H900L906.5 31L901.5 37L891.5 28.5V42.5H883.5V28.5L873.5 37L868.5 31.5L875.5 25.5H866V17.5H878.5L870 10.5L875.5 4.5L883.5 11"
        stroke="black"
      />
      <path
        d="M51.7143 468.619V441H69.6667V471.381L95.9048 450.667L109.714 467.238L86.2381 486.571H118V508.667H95.9048L113.857 523.857L100.048 540.429L72.4286 516.952V555.619H50.3333V516.952L22.7143 540.429L8.90476 525.238L28.2381 508.667H2V486.571H36.5238L13.0476 467.238L28.2381 450.667L50.3333 468.619"
        stroke="black"
        stroke-width="2.7619"
      />
      <g filter="url(#filter0_d_259_12736)">
        <path
          d="M529.323 309L442 348.349V457.773H550.885V479.335L587 405.487H529.323V309Z"
          fill="#F1DC1D"
        />
        <path
          d="M529.323 309L442 348.349V457.773H550.885V479.335L587 405.487H529.323V309Z"
          stroke="black"
          stroke-width="1.07807"
        />
      </g>
      <g filter="url(#filter1_d_259_12736)">
        <path
          d="M844.5 182H738V258H814.5V343.5H851L887 285V225.5H844.5V182Z"
          fill="#3063E9"
        />
        <path
          d="M844.5 182H738V258H814.5V343.5H851L887 285V225.5H844.5V182Z"
          stroke="black"
        />
      </g>
      <rect x="472" y="273" width="205" height="73" fill="white" />
      <path
        d="M545.146 300L548.598 291.598H550.426L553.883 300H552.395L551.586 297.961H547.438L546.635 300H545.146ZM547.906 296.76H551.117L549.512 292.693L547.906 296.76ZM554.791 291.598H556.051V295.318C556.242 294.975 556.512 294.701 556.859 294.498C557.211 294.295 557.582 294.193 557.973 294.193C558.738 294.193 559.359 294.475 559.836 295.037C560.312 295.596 560.551 296.314 560.551 297.193C560.551 298.064 560.303 298.77 559.807 299.309C559.311 299.848 558.658 300.117 557.85 300.117C557.463 300.117 557.107 300.037 556.783 299.877C556.459 299.713 556.199 299.475 556.004 299.162V300H554.791V291.598ZM557.645 299.004C558.109 299.004 558.5 298.836 558.816 298.5C559.133 298.164 559.291 297.729 559.291 297.193C559.291 296.658 559.131 296.215 558.811 295.863C558.49 295.508 558.102 295.33 557.645 295.33C557.211 295.33 556.828 295.508 556.496 295.863C556.168 296.215 556.004 296.658 556.004 297.193C556.004 297.729 556.166 298.164 556.49 298.5C556.814 298.836 557.199 299.004 557.645 299.004ZM561.752 291.598H563.012V295.318C563.203 294.975 563.473 294.701 563.82 294.498C564.172 294.295 564.543 294.193 564.934 294.193C565.699 294.193 566.32 294.475 566.797 295.037C567.273 295.596 567.512 296.314 567.512 297.193C567.512 298.064 567.264 298.77 566.768 299.309C566.271 299.848 565.619 300.117 564.811 300.117C564.424 300.117 564.068 300.037 563.744 299.877C563.42 299.713 563.16 299.475 562.965 299.162V300H561.752V291.598ZM564.605 299.004C565.07 299.004 565.461 298.836 565.777 298.5C566.094 298.164 566.252 297.729 566.252 297.193C566.252 296.658 566.092 296.215 565.771 295.863C565.451 295.508 565.062 295.33 564.605 295.33C564.172 295.33 563.789 295.508 563.457 295.863C563.129 296.215 562.965 296.658 562.965 297.193C562.965 297.729 563.127 298.164 563.451 298.5C563.775 298.836 564.16 299.004 564.605 299.004ZM572.393 294.311H573.711L569.867 302.379H568.549L570.072 299.162L567.828 294.311H569.188L570.734 297.791L572.393 294.311ZM580.502 292.74C580.053 292.74 579.689 292.838 579.412 293.033C579.139 293.225 579.002 293.467 579.002 293.76C579.002 294.006 579.094 294.221 579.277 294.404C579.465 294.588 579.709 294.734 580.01 294.844C580.311 294.953 580.691 295.053 581.152 295.143C582.133 295.33 582.859 295.621 583.332 296.016C583.805 296.406 584.041 296.934 584.041 297.598C584.041 298.324 583.736 298.926 583.127 299.402C582.518 299.879 581.73 300.117 580.766 300.117C579.965 300.117 579.213 299.926 578.51 299.543C577.814 299.145 577.318 298.477 577.021 297.539L578.281 296.76C578.43 297.436 578.721 297.955 579.154 298.318C579.588 298.678 580.129 298.857 580.777 298.857C581.348 298.857 581.805 298.748 582.148 298.529C582.492 298.307 582.664 298.018 582.664 297.662C582.664 297.318 582.51 297.041 582.201 296.83C581.896 296.619 581.391 296.455 580.684 296.338C579.688 296.166 578.938 295.875 578.434 295.465C577.934 295.055 577.684 294.49 577.684 293.771C577.684 293.139 577.959 292.6 578.51 292.154C579.064 291.705 579.77 291.48 580.625 291.48C581.336 291.48 581.965 291.66 582.512 292.02C583.062 292.379 583.453 292.879 583.684 293.52L582.424 294.24C582.307 293.756 582.086 293.385 581.762 293.127C581.438 292.869 581.018 292.74 580.502 292.74ZM585.201 294.311H586.461V295.113C586.73 294.5 587.23 294.193 587.961 294.193C588.324 294.193 588.637 294.295 588.898 294.498C589.16 294.697 589.348 294.992 589.461 295.383C589.602 294.992 589.814 294.697 590.1 294.498C590.389 294.295 590.717 294.193 591.084 294.193C591.623 294.193 592.047 294.365 592.355 294.709C592.668 295.049 592.824 295.533 592.824 296.162V300H591.564V296.438C591.564 296.09 591.475 295.816 591.295 295.617C591.119 295.418 590.889 295.318 590.604 295.318C590.318 295.318 590.086 295.418 589.906 295.617C589.73 295.816 589.643 296.09 589.643 296.438V300H588.383V296.438C588.383 296.09 588.293 295.816 588.113 295.617C587.938 295.418 587.707 295.318 587.422 295.318C587.129 295.318 586.895 295.426 586.719 295.641C586.547 295.855 586.461 296.16 586.461 296.555V300H585.201V294.311ZM594.354 294.311H595.613V300H594.354V294.311ZM594.295 293.338V291.961H595.672V293.338H594.295ZM597.77 298.201V295.395H596.627V294.311H597.77V292.5H599.029V294.311H601.186V295.395H599.029V298.26C599.029 298.51 599.096 298.703 599.229 298.84C599.365 298.973 599.537 299.039 599.744 299.039C599.986 299.039 600.172 298.961 600.301 298.805C600.43 298.648 600.506 298.406 600.529 298.078L601.725 298.318C601.674 298.889 601.479 299.332 601.139 299.648C600.799 299.961 600.355 300.117 599.809 300.117C599.148 300.117 598.643 299.949 598.291 299.613C597.943 299.277 597.77 298.807 597.77 298.201ZM604.004 300H602.744V291.598H604.004V295.477C604.152 295.074 604.398 294.76 604.742 294.533C605.09 294.307 605.5 294.193 605.973 294.193C606.59 294.193 607.082 294.385 607.449 294.768C607.816 295.146 608 295.643 608 296.256V300H606.74V296.613C606.74 296.164 606.629 295.822 606.406 295.588C606.184 295.354 605.859 295.236 605.434 295.236C605.02 295.236 604.678 295.396 604.408 295.717C604.139 296.033 604.004 296.453 604.004 296.977V300Z"
        fill="black"
      />
      <path
        d="M547.186 319L545.158 310.598H546.318L548.105 318.268L549.969 310.598H551.891L553.748 318.268L555.535 310.598H556.701L554.674 319H552.822L550.93 311.307L549.02 319H547.186ZM561.512 316.938L562.408 317.283C562.213 317.873 561.9 318.326 561.471 318.643C561.041 318.959 560.506 319.117 559.865 319.117C559.021 319.117 558.332 318.844 557.797 318.297C557.266 317.75 557 317.023 557 316.117C557 315.574 557.111 315.082 557.334 314.641C557.561 314.195 557.881 313.844 558.295 313.586C558.713 313.324 559.186 313.193 559.713 313.193C560.475 313.193 561.086 313.412 561.547 313.85C562.012 314.279 562.244 314.867 562.244 315.613C562.244 315.863 562.221 316.096 562.174 316.311H558.055C558.059 316.908 558.23 317.375 558.57 317.711C558.91 318.043 559.342 318.209 559.865 318.209C560.725 318.209 561.273 317.785 561.512 316.938ZM558.055 315.566H561.213L561.225 315.402C561.225 315.004 561.08 314.688 560.791 314.453C560.506 314.219 560.143 314.102 559.701 314.102C559.26 314.102 558.887 314.234 558.582 314.5C558.281 314.762 558.105 315.117 558.055 315.566ZM563.398 317.383C563.398 316.816 563.592 316.381 563.979 316.076C564.365 315.768 564.877 315.613 565.514 315.613C565.92 315.613 566.322 315.674 566.721 315.795L567.242 315.941V315.35C567.242 314.943 567.111 314.629 566.85 314.406C566.592 314.18 566.246 314.066 565.812 314.066C565.406 314.066 565.07 314.172 564.805 314.383C564.543 314.59 564.375 314.877 564.301 315.244L563.363 314.98C563.48 314.43 563.754 313.994 564.184 313.674C564.613 313.354 565.156 313.193 565.812 313.193C566.582 313.193 567.178 313.391 567.6 313.785C568.025 314.18 568.238 314.73 568.238 315.438V319H567.242V318.098C567.098 318.406 566.848 318.654 566.492 318.842C566.141 319.025 565.738 319.117 565.285 319.117C564.754 319.117 564.305 318.963 563.938 318.654C563.578 318.33 563.398 317.906 563.398 317.383ZM567.242 316.879V316.756L566.709 316.598C566.311 316.48 565.959 316.422 565.654 316.422C565.283 316.422 564.992 316.5 564.781 316.656C564.57 316.809 564.465 317.029 564.465 317.318C564.465 317.588 564.566 317.805 564.77 317.969C564.973 318.129 565.26 318.209 565.631 318.209C566.111 318.209 566.5 318.09 566.797 317.852C567.094 317.609 567.242 317.285 567.242 316.879ZM569.979 313.311L571.795 317.992L573.594 313.311H574.695L572.416 319H571.156L568.889 313.311H569.979ZM579.711 316.938L580.607 317.283C580.412 317.873 580.1 318.326 579.67 318.643C579.24 318.959 578.705 319.117 578.064 319.117C577.221 319.117 576.531 318.844 575.996 318.297C575.465 317.75 575.199 317.023 575.199 316.117C575.199 315.574 575.311 315.082 575.533 314.641C575.76 314.195 576.08 313.844 576.494 313.586C576.912 313.324 577.385 313.193 577.912 313.193C578.674 313.193 579.285 313.412 579.746 313.85C580.211 314.279 580.443 314.867 580.443 315.613C580.443 315.863 580.42 316.096 580.373 316.311H576.254C576.258 316.908 576.43 317.375 576.77 317.711C577.109 318.043 577.541 318.209 578.064 318.209C578.924 318.209 579.473 317.785 579.711 316.938ZM576.254 315.566H579.412L579.424 315.402C579.424 315.004 579.279 314.688 578.99 314.453C578.705 314.219 578.342 314.102 577.9 314.102C577.459 314.102 577.086 314.234 576.781 314.5C576.48 314.762 576.305 315.117 576.254 315.566ZM581.926 319V310.598H585.043C585.914 310.598 586.664 310.779 587.293 311.143C587.926 311.502 588.4 312 588.717 312.637C589.037 313.27 589.197 314.002 589.197 314.834C589.197 315.436 589.104 315.99 588.916 316.498C588.729 317.006 588.459 317.445 588.107 317.816C587.76 318.188 587.322 318.479 586.795 318.689C586.271 318.896 585.688 319 585.043 319H581.926ZM583.027 311.605V317.992H585.043C585.68 317.992 586.23 317.855 586.695 317.582C587.16 317.305 587.508 316.932 587.738 316.463C587.973 315.99 588.09 315.447 588.09 314.834C588.09 313.838 587.822 313.051 587.287 312.473C586.756 311.895 586.008 311.605 585.043 311.605H583.027ZM590.633 319V310.598H594.436C595.221 310.598 595.861 310.807 596.357 311.225C596.854 311.643 597.102 312.162 597.102 312.783C597.102 313.193 596.986 313.566 596.756 313.902C596.529 314.238 596.223 314.494 595.836 314.67C596.336 314.834 596.721 315.09 596.99 315.438C597.264 315.785 597.4 316.217 597.4 316.732C597.4 317.377 597.141 317.916 596.621 318.35C596.102 318.783 595.457 319 594.688 319H590.633ZM591.734 314.189H594.482C594.959 314.189 595.332 314.076 595.602 313.85C595.871 313.619 596.006 313.301 596.006 312.895C596.006 312.516 595.861 312.213 595.572 311.986C595.283 311.76 594.92 311.646 594.482 311.646H591.734V314.189ZM591.734 317.957H594.652C595.121 317.957 595.504 317.832 595.801 317.582C596.098 317.328 596.246 316.996 596.246 316.586C596.246 316.176 596.098 315.838 595.801 315.572C595.508 315.307 595.125 315.174 594.652 315.174H591.734V317.957Z"
        fill="#475467"
      />
      <rect
        x="472"
        y="273"
        width="205"
        height="73"
        stroke="black"
        stroke-width="2"
      />
      <rect x="566" y="140" width="205" height="73" fill="white" />
      <path
        d="M649.887 159.48C650.477 159.469 651.043 159.578 651.586 159.809C652.133 160.039 652.604 160.35 652.998 160.74C653.393 161.131 653.705 161.594 653.936 162.129C654.166 162.664 654.275 163.221 654.264 163.799C654.275 164.377 654.166 164.936 653.936 165.475C653.705 166.01 653.393 166.473 652.998 166.863C652.604 167.254 652.133 167.564 651.586 167.795C651.043 168.021 650.477 168.129 649.887 168.117C649.297 168.129 648.729 168.021 648.182 167.795C647.639 167.564 647.17 167.254 646.775 166.863C646.381 166.473 646.066 166.01 645.832 165.475C645.602 164.936 645.492 164.377 645.504 163.799C645.492 163.225 645.602 162.67 645.832 162.135C646.066 161.596 646.381 161.131 646.775 160.74C647.17 160.35 647.639 160.039 648.182 159.809C648.729 159.578 649.297 159.469 649.887 159.48ZM649.887 166.857C650.438 166.857 650.939 166.73 651.393 166.477C651.85 166.219 652.213 165.855 652.482 165.387C652.752 164.918 652.887 164.389 652.887 163.799C652.887 162.904 652.6 162.172 652.025 161.602C651.455 161.027 650.742 160.74 649.887 160.74C649.031 160.74 648.316 161.029 647.742 161.607C647.172 162.186 646.887 162.92 646.887 163.811C646.887 164.705 647.176 165.438 647.754 166.008C648.332 166.574 649.043 166.857 649.887 166.857ZM655.541 168V159.598H656.801V168H655.541ZM658.342 162.311H659.602V168H658.342V162.311ZM658.283 161.338V159.961H659.66V161.338H658.283ZM661.91 162.311L663.58 166.74L665.244 162.311H666.568L664.301 168H662.859L660.592 162.311H661.91ZM667.553 162.311H668.812V168H667.553V162.311ZM667.494 161.338V159.961H668.871V161.338H667.494ZM674.232 162.311H675.551L671.707 170.379H670.389L671.912 167.162L669.668 162.311H671.027L672.574 165.791L674.232 162.311ZM676.184 166.383C676.184 165.785 676.381 165.332 676.775 165.023C677.174 164.711 677.701 164.555 678.357 164.555C678.705 164.555 679.041 164.596 679.365 164.678L679.963 164.818V164.402C679.963 164.031 679.84 163.74 679.594 163.529C679.348 163.318 679.031 163.213 678.645 163.213C678.273 163.213 677.967 163.314 677.725 163.518C677.486 163.717 677.332 163.99 677.262 164.338L676.125 164.039C676.254 163.469 676.535 163.02 676.969 162.691C677.402 162.359 677.961 162.193 678.645 162.193C679.453 162.193 680.074 162.391 680.508 162.785C680.945 163.18 681.164 163.738 681.164 164.461V168H679.963V167.039C679.834 167.371 679.605 167.635 679.277 167.83C678.953 168.021 678.547 168.117 678.059 168.117C677.562 168.117 677.125 167.959 676.746 167.643C676.371 167.322 676.184 166.902 676.184 166.383ZM679.963 165.838V165.779L679.506 165.662C679.096 165.557 678.781 165.504 678.562 165.504C678.234 165.504 677.975 165.568 677.783 165.697C677.596 165.822 677.502 166.01 677.502 166.26C677.502 166.494 677.592 166.684 677.771 166.828C677.951 166.969 678.215 167.039 678.562 167.039C678.98 167.039 679.318 166.932 679.576 166.717C679.834 166.502 679.963 166.209 679.963 165.838Z"
        fill="black"
      />
      <path
        d="M645.158 184L648.674 175.598H650.209L653.725 184H652.5L651.639 181.861H647.244L646.365 184H645.158ZM647.643 180.854H651.229L649.441 176.477L647.643 180.854ZM654.674 178.311H655.705V179.143C655.83 178.838 656.018 178.604 656.268 178.439C656.518 178.275 656.814 178.193 657.158 178.193C657.615 178.193 657.988 178.342 658.277 178.639C658.57 178.936 658.717 179.303 658.717 179.74C658.717 179.971 658.693 180.184 658.646 180.379H657.639C657.662 180.207 657.674 180.066 657.674 179.957C657.674 179.691 657.592 179.482 657.428 179.33C657.268 179.178 657.047 179.102 656.766 179.102C656.445 179.102 656.188 179.219 655.992 179.453C655.801 179.688 655.705 179.996 655.705 180.379V184H654.674V178.311ZM660.381 178.311L661.711 182.992L662.994 178.311H664.207L665.49 182.992L666.826 178.311H667.846L666.152 184H664.869L663.609 179.635L662.35 184H661.055L659.361 178.311H660.381ZM672.938 181.938L673.834 182.283C673.639 182.873 673.326 183.326 672.896 183.643C672.467 183.959 671.932 184.117 671.291 184.117C670.447 184.117 669.758 183.844 669.223 183.297C668.691 182.75 668.426 182.023 668.426 181.117C668.426 180.574 668.537 180.082 668.76 179.641C668.986 179.195 669.307 178.844 669.721 178.586C670.139 178.324 670.611 178.193 671.139 178.193C671.9 178.193 672.512 178.412 672.973 178.85C673.438 179.279 673.67 179.867 673.67 180.613C673.67 180.863 673.646 181.096 673.6 181.311H669.48C669.484 181.908 669.656 182.375 669.996 182.711C670.336 183.043 670.768 183.209 671.291 183.209C672.15 183.209 672.699 182.785 672.938 181.938ZM669.48 180.566H672.639L672.65 180.402C672.65 180.004 672.506 179.688 672.217 179.453C671.932 179.219 671.568 179.102 671.127 179.102C670.686 179.102 670.312 179.234 670.008 179.5C669.707 179.762 669.531 180.117 669.48 180.566ZM674.824 182.383C674.824 181.816 675.018 181.381 675.404 181.076C675.791 180.768 676.303 180.613 676.939 180.613C677.346 180.613 677.748 180.674 678.146 180.795L678.668 180.941V180.35C678.668 179.943 678.537 179.629 678.275 179.406C678.018 179.18 677.672 179.066 677.238 179.066C676.832 179.066 676.496 179.172 676.23 179.383C675.969 179.59 675.801 179.877 675.727 180.244L674.789 179.98C674.906 179.43 675.18 178.994 675.609 178.674C676.039 178.354 676.582 178.193 677.238 178.193C678.008 178.193 678.604 178.391 679.025 178.785C679.451 179.18 679.664 179.73 679.664 180.438V184H678.668V183.098C678.523 183.406 678.273 183.654 677.918 183.842C677.566 184.025 677.164 184.117 676.711 184.117C676.18 184.117 675.73 183.963 675.363 183.654C675.004 183.33 674.824 182.906 674.824 182.383ZM678.668 181.879V181.756L678.135 181.598C677.736 181.48 677.385 181.422 677.08 181.422C676.709 181.422 676.418 181.5 676.207 181.656C675.996 181.809 675.891 182.029 675.891 182.318C675.891 182.588 675.992 182.805 676.195 182.969C676.398 183.129 676.686 183.209 677.057 183.209C677.537 183.209 677.926 183.09 678.223 182.852C678.52 182.609 678.668 182.285 678.668 181.879ZM681.404 178.311L683.221 182.992L685.02 178.311H686.121L683.842 184H682.582L680.314 178.311H681.404ZM691.137 181.938L692.033 182.283C691.838 182.873 691.525 183.326 691.096 183.643C690.666 183.959 690.131 184.117 689.49 184.117C688.646 184.117 687.957 183.844 687.422 183.297C686.891 182.75 686.625 182.023 686.625 181.117C686.625 180.574 686.736 180.082 686.959 179.641C687.186 179.195 687.506 178.844 687.92 178.586C688.338 178.324 688.811 178.193 689.338 178.193C690.1 178.193 690.711 178.412 691.172 178.85C691.637 179.279 691.869 179.867 691.869 180.613C691.869 180.863 691.846 181.096 691.799 181.311H687.68C687.684 181.908 687.855 182.375 688.195 182.711C688.535 183.043 688.967 183.209 689.49 183.209C690.35 183.209 690.898 182.785 691.137 181.938ZM687.68 180.566H690.838L690.85 180.402C690.85 180.004 690.705 179.688 690.416 179.453C690.131 179.219 689.768 179.102 689.326 179.102C688.885 179.102 688.512 179.234 688.207 179.5C687.906 179.762 687.73 180.117 687.68 180.566Z"
        fill="#475467"
      />
      <rect
        x="566"
        y="140"
        width="205"
        height="73"
        stroke="black"
        stroke-width="2"
      />
      <defs>
        <filter
          id="filter0_d_259_12736"
          x="441.461"
          y="308.166"
          width="155.027"
          height="180.03"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="8.62454" dy="8.62454" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_259_12736"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_259_12736"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_259_12736"
          x="737.5"
          y="181.5"
          width="158"
          height="170.5"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="8" dy="8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_259_12736"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_259_12736"
            result="shape"
          />
        </filter>
      </defs>
    </Icon>
  )
}
