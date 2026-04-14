import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Icon,
} from '@chakra-ui/react';
import {
  Button,
  IconButton,
  SearchInput,
  Menu,
  MenuItem,
  ArrowBack,
  Plus,
  Download,
  ImportXlsx,
  Info,
  More,
  Attention,
  Users,
  Dashboard,
  Chat,
  Email,
  Customers,
  Settings,
  Analytics,
  SMSCampaign,
  Schedule,
  Responses,
  Projects,
  Filter,
  ReputationManagment,
} from '@radiant/common/ui';

// ─── Nav icons (same as EmailCampaignPage) ────────────────────────────────────

const NAV_ICONS = [
  { icon: Dashboard, label: 'Dashboard' },
  { icon: Chat, label: 'Chat' },
  { icon: Analytics, label: 'AI' },
  { icon: Filter, label: 'Filter' },
  { icon: Projects, label: 'Projects' },
  { icon: Email, label: 'Email' },
  { icon: Customers, label: 'Customers' },
  { icon: SMSCampaign, label: 'Campaign' },
  { icon: Responses, label: 'Responses' },
  { icon: Schedule, label: 'Schedule' },
  { icon: ReputationManagment, label: 'Reputation' },
  { icon: Analytics, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

// ─── Stepper steps ────────────────────────────────────────────────────────────

const STEPS = [
  'Select recipient',
  'Compose your message',
  'Schedule',
  'Review & send',
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Recipient = {
  id: number;
  name: string;
  email: string;
  mobileWarning: boolean;
  balance: string;
  language: string;
};

const MOCK_RECIPIENTS: Recipient[] = [
  {
    id: 1,
    name: 'Michel Jamati',
    email: 'michel@lexop.com',
    mobileWarning: true,
    balance: '$2617.00',
    language: 'EN',
  },
];

// ─── Custom Stepper ───────────────────────────────────────────────────────────

function CampaignStepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <Box>
      {steps.map((label, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        const isLast = i === steps.length - 1;

        const circleBg = isActive || isCompleted ? '#11304F' : '#E6E8EB';
        const circleColor = isActive || isCompleted ? 'white' : '#6F7489';
        const labelColor = isActive ? '#11304F' : '#6F7489';

        return (
          <Box key={label}>
            {/* Step row */}
            <Flex align="center" gap="16px">
              {/* Number circle */}
              <Flex
                align="center"
                justify="center"
                borderRadius="full"
                bg={circleBg}
                w="32px"
                h="32px"
                flexShrink={0}
              >
                <Text
                  fontSize="14px"
                  fontWeight="bold"
                  color={circleColor}
                  lineHeight="24px"
                >
                  {i + 1}
                </Text>
              </Flex>

              {/* Label */}
              <Text
                fontSize="14px"
                fontWeight="medium"
                color={labelColor}
                whiteSpace="nowrap"
              >
                {label}
              </Text>
            </Flex>

            {/* Connector line */}
            {!isLast && (
              <Box w="32px" h="18px" overflow="hidden">
                <Box
                  ml="15px"
                  w="1px"
                  h="32px"
                  bg="#DDDFE4"
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [search, setSearch] = useState('');

  const filtered = MOCK_RECIPIENTS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
  };

  return (
    <Flex h="100vh" overflow="hidden">
      {/* ── Left Sidebar Nav (same as campaign list) ── */}
      <Flex
        as="nav"
        direction="column"
        align="center"
        bg="#292158"
        w="74px"
        py={5}
        gap={4}
        flexShrink={0}
        overflowY="auto"
      >
        {NAV_ICONS.map(({ icon, label }) => (
          <IconButton
            key={label}
            icon={icon}
            variant="action-dark"
            aria-label={label}
            size="md"
          />
        ))}
      </Flex>

      {/* ── Main Area ── */}
      <Flex direction="column" flex={1} overflow="hidden">

        {/* ── Top Header: back + title + Next ── */}
        <Flex
          align="center"
          justify="space-between"
          px={6}
          h="64px"
          bg="white"
          borderBottom="1px solid"
          borderColor="#DDDFE4"
          flexShrink={0}
        >
          <HStack spacing={3}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <IconButton
                icon={ArrowBack}
                variant="minimal"
                aria-label="Go back"
                size="sm"
              />
            </Link>
            <Text fontWeight="bold" fontSize="18px" color="#11304F">
              Create New Campaign
            </Text>
          </HStack>

          <Button
            label="Next"
            variant="primary"
            size="md"
            borderRadius="16px"
            bg="#48B5B5"
            _hover={{ bg: '#3DA3A3' }}
            color="white"
            minW="100px"
            onClick={handleNext}
            disabled={currentStep === STEPS.length - 1}
          />
        </Flex>

        {/* ── Body: stepper sidebar + content ── */}
        <Flex flex={1} overflow="hidden">

          {/* Custom stepper sidebar */}
          <Box
            w="240px"
            flexShrink={0}
            bg="#F4F6F8"
            px={6}
            pt={6}
            borderRight="1px solid"
            borderColor="#DDDFE4"
            overflowY="auto"
          >
            <CampaignStepper steps={STEPS} currentStep={currentStep} />
          </Box>

          {/* Step content */}
          <Box flex={1} overflowY="auto" px={8} pt={8} bg="white">
            {currentStep === 0 && (
              <SelectRecipientsStep
                search={search}
                onSearch={setSearch}
                recipients={filtered}
              />
            )}
            {currentStep === 1 && (
              <StepPlaceholder title="Compose your message" />
            )}
            {currentStep === 2 && (
              <StepPlaceholder title="Schedule" />
            )}
            {currentStep === 3 && (
              <StepPlaceholder title="Review & send" />
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

// ─── Step 1: Select Recipients ────────────────────────────────────────────────

type SelectRecipientsStepProps = {
  search: string;
  onSearch: (v: string) => void;
  recipients: Recipient[];
};

function SelectRecipientsStep({
  search,
  onSearch,
  recipients,
}: SelectRecipientsStepProps) {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        Select the recipients for this message
      </Text>
      <Divider borderColor="#11304F" mb={6} />

      {/* Toolbar */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box w="358px">
          <SearchInput
            placeholder="Search recipients"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearch(e.target.value)
            }
          />
        </Box>

        <HStack spacing={3}>
          <Button
            label="New"
            variant="secondary"
            icon={Users}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />
          <Button
            label="Import"
            variant="secondary"
            icon={ImportXlsx}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />
          <Button
            label="Download template"
            variant="secondary"
            icon={Download}
            iconPos="left"
            size="sm"
            borderRadius="8px"
          />

          {/* Stats card */}
          <Flex
            border="1px solid"
            borderColor="#DDDFE4"
            borderRadius="8px"
            overflow="hidden"
          >
            <HStack
              px={3}
              py={2}
              spacing={2}
              borderRight="1px solid"
              borderColor="#DDDFE4"
            >
              <Icon as={Plus} fontSize="14px" color="#11304F" />
              <Text fontSize="14px" color="#11304F" fontWeight="medium">
                {recipients.length}
              </Text>
            </HStack>
            <HStack px={3} py={2} spacing={2}>
              <Icon as={Users} fontSize="14px" color="#6F7489" />
              <Text fontSize="14px" color="#6F7489">
                {recipients.length}
              </Text>
            </HStack>
          </Flex>
        </HStack>
      </Flex>

      {/* Table */}
      <Table variant="simple" size="md">
        <Thead>
          <Tr borderBottom="1px solid" borderColor="#E6E8EB">
            {['Name', 'Email', 'Balance', 'Language'].map((col) => (
              <Th
                key={col}
                fontFamily="sans-serif"
                fontWeight="bold"
                color="#6F7489"
                fontSize="14px"
                textTransform="none"
                letterSpacing="normal"
                pl={col === 'Name' ? 0 : undefined}
              >
                {col}
              </Th>
            ))}
            <Th
              fontFamily="sans-serif"
              fontWeight="bold"
              color="#6F7489"
              fontSize="14px"
              textTransform="none"
              letterSpacing="normal"
            >
              <HStack spacing={1}>
                <Text>Mobile</Text>
                <Icon as={Info} fontSize="16px" color="#6F7489" />
              </HStack>
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {recipients.map((r) => (
            <Tr
              key={r.id}
              borderBottom="1px solid"
              borderColor="#F4F6F8"
              _hover={{ bg: 'gray.50' }}
            >
              <Td pl={0} color="#11304F" fontSize="16px" fontWeight="bold">
                {r.name}
              </Td>
              <Td color="#11304F" fontSize="16px">{r.email}</Td>
              <Td color="#11304F" fontSize="16px">{r.balance}</Td>
              <Td color="#11304F" fontSize="16px">{r.language}</Td>
              <Td>
                {r.mobileWarning ? (
                  <HStack spacing={1}>
                    <Icon as={Attention} fontSize="16px" color="orange.400" />
                    <Text
                      fontSize="14px"
                      color="#48B5B5"
                      textDecoration="underline"
                      cursor="pointer"
                    >
                      Edit
                    </Text>
                  </HStack>
                ) : (
                  <Text fontSize="16px" color="#11304F">—</Text>
                )}
              </Td>
              <Td>
                <Menu
                  menuButton={
                    <IconButton
                      icon={More}
                      variant="minimal"
                      aria-label="More options"
                      size="sm"
                    />
                  }
                >
                  <MenuItem title="Edit" onSelect={() => {}} />
                  <MenuItem title="Remove" danger onSelect={() => {}} />
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

// ─── Placeholder for other steps ─────────────────────────────────────────────

function StepPlaceholder({ title }: { title: string }) {
  return (
    <Box>
      <Text fontSize="20px" fontWeight="semibold" color="#11304F" mb={2}>
        {title}
      </Text>
      <Divider borderColor="#11304F" mb={6} />
      <Text color="#6F7489" fontSize="16px">
        This step is coming soon.
      </Text>
    </Box>
  );
}

export default NewCampaignPage;
